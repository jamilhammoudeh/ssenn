import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Download, 
  Users,
  Search,
  Calendar,
  Star,
  Package
} from "lucide-react";
import { toast } from "sonner";

// Interfaces
interface Order {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  customer_email: string;
  customer_name: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SalesData {
  sale_date: string;
  order_count: number;
  revenue: number;
  avg_order_value: number;
}

interface PopularProduct {
  product_id: string;
  product_name: string;
  sales_count: number;
  total_revenue: number;
  avg_price: number;
}

interface DownloadAnalytics {
  product_id: string;
  product_name: string;
  total_downloads: number;
  unique_downloaders: number;
  avg_downloads_per_user: number;
  total_data_transferred_mb: number;
}

const Analytics = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [downloadAnalytics, setDownloadAnalytics] = useState<DownloadAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("30"); // days

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateFilter]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders with date filter
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateFilter));
      
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Fetch sales analytics
      const { data: salesAnalytics, error: salesError } = await supabase
        .from("analytics_sales")
        .select("*")
        .limit(30);

      if (salesError) throw salesError;
      setSalesData(salesAnalytics || []);

      // Fetch popular products
      const { data: popularData, error: popularError } = await supabase
        .from("analytics_popular_products")
        .select("*")
        .limit(10);

      if (popularError) throw popularError;
      setPopularProducts(popularData || []);

      // Fetch download analytics
      const { data: downloadData, error: downloadError } = await supabase
        .from("analytics_downloads")
        .select("*")
        .limit(10);

      if (downloadError) throw downloadError;
      setDownloadAnalytics(downloadData || []);

    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary stats
  const totalRevenue = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, order) => sum + (order.amount / 100), 0);
  
  const totalOrders = orders.filter(o => o.status === 'paid').length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalDownloads = downloadAnalytics.reduce((sum, d) => sum + d.total_downloads, 0);

  // Filter orders for search
  const filteredOrders = orders.filter(order => 
    (order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.product_name?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
  );

  // Prepare chart data
  const revenueChartData = salesData.slice(0, 7).reverse().map(item => ({
    date: new Date(item.sale_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: item.revenue,
    orders: item.order_count
  }));

  const topProductsData = popularProducts.slice(0, 5).map(product => ({
    name: product.product_name?.substring(0, 15) + '...' || 'Unknown',
    sales: product.sales_count,
    revenue: product.total_revenue
  }));

  const downloadData = downloadAnalytics.slice(0, 5).map(item => ({
    name: item.product_name?.substring(0, 15) + '...' || 'Unknown',
    downloads: item.total_downloads,
    users: item.unique_downloaders
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BarChart className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Loading analytics...</p>
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
              Business Analytics
            </h1>
            <p className="text-muted-foreground">Insights into your digital product performance</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% from last period
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% from last period
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -2.1% from last period
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">{totalDownloads}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.3% from last period
                  </p>
                </div>
                <Download className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="downloads">Download Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="border-primary/20 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Daily revenue over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Products Chart */}
              <Card className="border-primary/20 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Top Selling Products
                  </CardTitle>
                  <CardDescription>Best performing products by sales count</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProductsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Download Analytics Chart */}
            <Card className="border-primary/20 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Performance
                </CardTitle>
                <CardDescription>Download metrics by product</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={downloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="downloads" fill="#ffc658" />
                    <Bar dataKey="users" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-primary/20 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Management
                </CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
                <div className="flex items-center gap-2 mt-4">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by customer or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{order.customer_name || order.customer_email}</span>
                            <Badge variant={order.status === 'paid' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.product_name}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {order.customer_email}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${(order.amount / 100).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {filteredOrders.length === 0 && (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No orders found</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20 shadow-elegant">
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                  <CardDescription>Top performing products by sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularProducts.slice(0, 5).map((product, index) => (
                      <div key={product.product_id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{product.product_name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales_count} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${product.total_revenue.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">${product.avg_price.toFixed(2)} avg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-elegant">
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>Revenue share by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={topProductsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {topProductsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-6">
            <Card className="border-primary/20 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Analytics
                </CardTitle>
                <CardDescription>Track product download performance and user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloadAnalytics.map((item) => (
                    <div key={item.product_id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{item.product_name}</h3>
                        <Badge variant="outline">{item.total_downloads} downloads</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Downloads</p>
                          <p className="font-semibold">{item.total_downloads}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unique Users</p>
                          <p className="font-semibold">{item.unique_downloaders}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg per User</p>
                          <p className="font-semibold">{item.avg_downloads_per_user.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Data Transferred</p>
                          <p className="font-semibold">{item.total_data_transferred_mb.toFixed(1)} MB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {downloadAnalytics.length === 0 && (
                    <div className="text-center py-8">
                      <Download className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No download data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;