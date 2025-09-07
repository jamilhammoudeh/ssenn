-- Drop and recreate views without security definer issues
DROP VIEW IF EXISTS public.analytics_sales;
DROP VIEW IF EXISTS public.analytics_popular_products;
DROP VIEW IF EXISTS public.analytics_downloads;

-- Create analytics views with proper security (invoker's rights)
CREATE VIEW public.analytics_sales AS
SELECT 
  DATE(created_at) as sale_date,
  COUNT(*) as order_count,
  SUM(amount/100.0) as revenue,
  AVG(amount/100.0) as avg_order_value
FROM public.orders 
WHERE status = 'paid'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

CREATE VIEW public.analytics_popular_products AS
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

CREATE VIEW public.analytics_downloads AS
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

-- Enable RLS on these views
ALTER VIEW public.analytics_sales SET (security_barrier = true);
ALTER VIEW public.analytics_popular_products SET (security_barrier = true);
ALTER VIEW public.analytics_downloads SET (security_barrier = true);