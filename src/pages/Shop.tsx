import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCartSimple, FunnelSimple, X } from "@phosphor-icons/react";
import { toast } from "sonner";
import ProductDetailModal from "@/components/ProductDetailModal";
import PageHeader from "@/components/PageHeader";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at?: string;
  product_images?: Array<{
    id: string;
    image_url: string;
    display_order: number;
    is_primary: boolean;
    alt_text?: string;
  }>;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["all", "Education", "Design", "Audio", "Business"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          product_images (
            id,
            image_url,
            display_order,
            is_primary,
            alt_text
          )
        `
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    if (cart.find((item) => item.id === product.id)) {
      toast.info("Product already in cart");
      return;
    }
    setCart([...cart, product]);
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
    toast.success("Removed from cart");
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getPrimaryImage = (product: Product) => {
    const primaryImage = product.product_images?.find((img) => img.is_primary);
    return primaryImage?.image_url || product.image_url;
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <PageHeader
        eyebrow="Shop"
        title="Digital products"
        description="High-quality digital products for creators and entrepreneurs."
      />

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cart summary */}
        {cart.length > 0 && (
          <div className="mb-10 rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShoppingCartSimple className="h-5 w-5 text-primary" weight="light" />
                <span className="font-medium">Cart · {cart.length} item{cart.length > 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold">
                  ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </span>
                <Button size="sm">Checkout</Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {cart.map((item) => (
                <span
                  key={item.id}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-sm"
                >
                  {item.name}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" weight="bold" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FunnelSimple className="h-4 w-4" weight="light" />
            <span>Filter</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All products" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-border"
              >
                <div className="aspect-video animate-pulse bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-card"
                onClick={() => openProductModal(product)}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {getPrimaryImage(product) ? (
                    <img
                      src={getPrimaryImage(product)}
                      alt={product.name}
                      className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}
                  <Badge className="absolute right-2 top-2" variant="secondary">
                    {product.category}
                  </Badge>
                  {product.product_images && product.product_images.length > 1 && (
                    <Badge className="absolute bottom-2 left-2 bg-background/85 text-foreground">
                      {product.product_images.length} images
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-sans text-lg">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="font-display text-2xl font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={cart.some((item) => item.id === product.id)}
                  >
                    {cart.some((item) => item.id === product.id)
                      ? "In cart"
                      : "Add to cart"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}

        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
          onAddToCart={addToCart}
          isInCart={
            selectedProduct
              ? cart.some((item) => item.id === selectedProduct.id)
              : false
          }
        />
      </section>
    </div>
  );
};

export default Shop;
