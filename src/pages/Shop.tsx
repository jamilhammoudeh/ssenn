import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter } from "lucide-react";
import { toast } from "sonner";
import ProductDetailModal from "@/components/ProductDetailModal";

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
        .select(`
          *,
          product_images (
            id,
            image_url,
            display_order,
            is_primary,
            alt_text
          )
        `)
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
    if (cart.find(item => item.id === product.id)) {
      toast.info("Product already in cart");
      return;
    }
    setCart([...cart, product]);
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
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
    const primaryImage = product.product_images?.find(img => img.is_primary);
    return primaryImage?.image_url || product.image_url;
  };

  const filteredProducts = selectedCategory === "all"
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Digital Products Shop</h1>
          <p className="text-muted-foreground text-lg">
            High-quality digital products for creators and entrepreneurs
          </p>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mb-8 p-4 bg-card rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart ({cart.length} items)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">
                  ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </span>
                <Button>Checkout</Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                  <span>{item.name}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter by category:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Products" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openProductModal(product)}
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                {getPrimaryImage(product) ? (
                  <img 
                    src={getPrimaryImage(product)} 
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image
                  </div>
                )}
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {product.category}
                </Badge>
                {product.product_images && product.product_images.length > 1 && (
                  <Badge className="absolute bottom-2 left-2 bg-background/80 text-foreground">
                    {product.product_images.length} images
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
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
                  disabled={cart.some(item => item.id === product.id)}
                >
                  {cart.some(item => item.id === product.id) ? "In Cart" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
          onAddToCart={addToCart}
          isInCart={selectedProduct ? cart.some(item => item.id === selectedProduct.id) : false}
        />
      </div>
    </div>
  );
};

export default Shop;