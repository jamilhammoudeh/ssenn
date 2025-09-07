-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Add RLS policies for product management
CREATE POLICY "Enable insert for admin users" ON public.products
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for admin users" ON public.products
FOR UPDATE USING (true);

CREATE POLICY "Enable delete for admin users" ON public.products
FOR DELETE USING (true);

-- Create RLS policies for storage bucket
CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Admin can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');