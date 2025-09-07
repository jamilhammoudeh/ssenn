-- Drop and recreate views with security_invoker=on to fix security warnings
DROP VIEW IF EXISTS public.analytics_sales;
DROP VIEW IF EXISTS public.analytics_popular_products;
DROP VIEW IF EXISTS public.analytics_downloads;

-- Create analytics views with security_invoker=on (proper security)
CREATE VIEW public.analytics_sales
WITH (security_invoker=on) AS
SELECT 
  DATE(created_at) as sale_date,
  COUNT(*) as order_count,
  SUM(amount/100.0) as revenue,
  AVG(amount/100.0) as avg_order_value
FROM public.orders 
WHERE status = 'paid'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

CREATE VIEW public.analytics_popular_products
WITH (security_invoker=on) AS
SELECT 
  o.product_id,
  o.product_name,
  COUNT(*) as sales_count,
  SUM(o.amount/100.0) as total_revenue,
  AVG(o.amount/100.0) as avg_price
FROM public.orders o
WHERE o.status = 'paid'
GROUP BY o.product_id, o.product_name
ORDER BY sales_count DESC;

CREATE VIEW public.analytics_downloads
WITH (security_invoker=on) AS
SELECT 
  d.product_id,
  d.product_name,
  COUNT(*) as total_downloads,
  COUNT(DISTINCT d.user_id) as unique_downloaders,
  AVG(d.download_count) as avg_downloads_per_user,
  SUM(COALESCE(d.download_size_mb, 0)) as total_data_transferred_mb
FROM public.downloads d
GROUP BY d.product_id, d.product_name
ORDER BY total_downloads DESC;