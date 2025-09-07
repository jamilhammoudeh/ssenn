import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Save, 
  X, 
  Image as ImageIcon, 
  Star, 
  MoveUp, 
  MoveDown,
  Eye,
  Settings,
  Package,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

interface ProductImage {
  id: string;
  product_id: string;
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
  digital_file_url?: string;
  is_active: boolean;
  created_at?: string;
  product_images?: Array<{
    id: string;
    image_url: string;
    display_order: number;
    is_primary: boolean;
    alt_text?: string;
  }>;
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  digital_file_url: string;
  is_active: boolean;
}

const EnhancedAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    category: "",
    digital_file_url: "",
    is_active: true
  });

  const categories = ["Education", "Design", "Audio", "Business"];

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

  const uploadImages = async (files: File[], productId: string): Promise<ProductImage[]> => {
    const uploadedImages: ProductImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        // Save to product_images table
        const { data: imageData, error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: productId,
            image_url: data.publicUrl,
            display_order: i,
            is_primary: i === 0,
            alt_text: file.name
          })
          .select()
          .single();

        if (imageError) throw imageError;
        uploadedImages.push(imageData);
      } catch (error) {
        console.error(`Error uploading image ${file.name}:`, error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    return uploadedImages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        digital_file_url: formData.digital_file_url,
        is_active: formData.is_active
      };

      let productId: string;

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        
        if (error) throw error;
        productId = editingProduct.id;
        toast.success("Product updated successfully");
      } else {
        const { data: newProduct, error } = await supabase
          .from("products")
          .insert([productData])
          .select()
          .single();
        
        if (error) throw error;
        productId = newProduct.id;
        toast.success("Product created successfully");
      }

      // Upload new images if any
      if (imageFiles.length > 0) {
        await uploadImages(imageFiles, productId);
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      digital_file_url: product.digital_file_url || "",
      is_active: product.is_active
    });

    // Fetch product images
    const { data: images } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)
      .order('display_order');
    
    setProductImages(images || []);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
      
      setProductImages(prev => prev.filter(img => img.id !== imageId));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const setPrimaryImage = async (imageId: string) => {
    try {
      // First, unset all primary images for this product
      const { error: unsetError } = await supabase
        .from('product_images')
        .update({ is_primary: false })
        .eq('product_id', editingProduct?.id);

      if (unsetError) throw unsetError;

      // Then set the selected image as primary
      const { error: setPrimaryError } = await supabase
        .from('product_images')
        .update({ is_primary: true })
        .eq('id', imageId);

      if (setPrimaryError) throw setPrimaryError;

      setProductImages(prev => 
        prev.map(img => ({ 
          ...img, 
          is_primary: img.id === imageId 
        }))
      );
      
      toast.success("Primary image updated");
    } catch (error) {
      console.error("Error setting primary image:", error);
      toast.error("Failed to update primary image");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      digital_file_url: "",
      is_active: true
    });
    setEditingProduct(null);
    setImageFiles([]);
    setProductImages([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const getPrimaryImage = (product: Product) => {
    const primaryImage = product.product_images?.find(img => img.is_primary);
    return primaryImage?.image_url || product.image_url;
  };

  const getStats = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.is_active).length;
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const categoryCounts = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalProducts, activeProducts, totalValue, categoryCounts };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your digital products with ease</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)} className="shadow-elegant">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Product Details</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter product description"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="digital_file_url">Digital File URL</Label>
                        <Input
                          id="digital_file_url"
                          value={formData.digital_file_url}
                          onChange={(e) => setFormData({ ...formData, digital_file_url: e.target.value })}
                          placeholder="https://example.com/file.zip"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      />
                      <Label htmlFor="is_active">Product is active</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={handleDialogClose}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button type="submit" disabled={uploading}>
                        <Save className="w-4 h-4 mr-2" />
                        {uploading ? "Saving..." : editingProduct ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="images" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="images">Upload Images</Label>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                      <p className="text-sm text-muted-foreground">
                        Select multiple images. The first image will be set as primary.
                      </p>
                    </div>

                    {/* Preview new images */}
                    {imageFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>New Images Preview</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imageFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              {index === 0 && (
                                <Badge className="absolute top-1 right-1 text-xs">Primary</Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing images for editing */}
                    {editingProduct && productImages.length > 0 && (
                      <div className="space-y-2">
                        <Label>Current Images</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {productImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.image_url}
                                alt={image.alt_text || "Product image"}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              {image.is_primary && (
                                <Badge className="absolute top-2 left-2 bg-primary">
                                  <Star className="w-3 h-3 mr-1" />
                                  Primary
                                </Badge>
                              )}
                              <div className="absolute top-2 right-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!image.is_primary && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setPrimaryImage(image.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Star className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteImage(image.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Products</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeProducts}</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{Object.keys(stats.categoryCounts).length}</p>
                </div>
                <Settings className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {getPrimaryImage(product) ? (
                  <img 
                    src={getPrimaryImage(product)} 
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-2 right-2 space-x-1">
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline">
                    {product.category}
                  </Badge>
                </div>
                {product.product_images && product.product_images.length > 1 && (
                  <Badge className="absolute bottom-2 left-2 bg-background/80 text-foreground">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {product.product_images.length} images
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {product.digital_file_url && (
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Digital file
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg mb-4">
              No products found. Create your first product to get started!
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAdmin;
