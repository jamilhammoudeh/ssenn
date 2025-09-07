-- Create product_images table for multiple images per product
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view product images" ON public.product_images
FOR SELECT USING (true);

CREATE POLICY "Admin can insert product images" ON public.product_images
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update product images" ON public.product_images
FOR UPDATE USING (true);

CREATE POLICY "Admin can delete product images" ON public.product_images
FOR DELETE USING (true);

-- Add index for better performance
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_display_order ON public.product_images(product_id, display_order);