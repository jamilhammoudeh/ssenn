import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarBlank, Package, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";

interface ProductImage {
  id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  alt_text?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at?: string;
  product_images?: ProductImage[];
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isInCart 
}: ProductDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get all images (product_images + fallback to main image_url)
  const allImages = product.product_images && product.product_images.length > 0 
    ? product.product_images.sort((a, b) => a.display_order - b.display_order)
    : product.image_url 
      ? [{ id: 'main', image_url: product.image_url, display_order: 0, is_primary: true }] 
      : [];

  const currentImage = allImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative group">
              {currentImage ? (
                <>
                  <img 
                    src={currentImage.image_url} 
                    alt={currentImage.alt_text || product.name}
                    className="object-cover w-full h-full"
                  />
                  {allImages.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                      >
                        <CaretLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                      >
                        <CaretRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Package className="w-16 h-16" />
                </div>
              )}
              <Badge className="absolute top-4 right-4" variant="secondary">
                {product.category}
              </Badge>
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="outline" className="bg-background/80">
                    {currentImageIndex + 1} / {allImages.length}
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary shadow-md' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text || `${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                ${product.price.toFixed(2)}
              </div>
              <Badge variant="outline" className="mb-4">
                {product.category}
              </Badge>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Digital Product</span>
                </div>
                {product.created_at && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarBlank className="w-4 h-4" />
                    <span>Released {formatDate(product.created_at)}</span>
                  </div>
                )}
                {allImages.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{allImages.length} image{allImages.length > 1 ? 's' : ''} available</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">What's Included</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Instant digital download</li>
                <li>• High-quality files</li>
                <li>• Lifetime access</li>
                <li>• Commercial license included</li>
                <li>• Multiple file formats</li>
              </ul>
            </div>

            <div className="pt-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => onAddToCart(product)}
                disabled={isInCart}
              >
                {isInCart ? "Already in Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;