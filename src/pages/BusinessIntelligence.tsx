import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Download,
  DollarSign,
  Eye,
  Mail,
  Package,
  RefreshCw,
  Search,
  ShoppingCart,
  TrendingUp,
  User,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  user_id: string | null;
  product_id: string | null;
  product_name: string | null;
  customer_email: string | null;
  customer_name: string | null;
  amount: number;
  status: string;
  stripe_session_id: string | null;
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

interface DownloadData {
  product_id: string;
  product_name: string;
  total_downloads: number;
  unique_downloaders: number;
  avg_downloads_per_user: number;
  total_data_transferred_mb: number;
}

const BusinessIntelligence = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [downloadData, setDownloadData] = useState<DownloadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    fetchAllData();
  }, [dateRange]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchOrders(),
        fetchSalesData(),
        fetchPopularProducts(),
        fetchDownloadData()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (dateRange !== "all") {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
        query = query.gte("created_at", daysAgo.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchSalesData = async () => {
    try {
      let query = supabase
        .from("analytics_sales")
        .select("*")
        .limit(30);

      if (dateRange !== "all") {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
        query = query.gte("sale_date", daysAgo.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSalesData(data || []);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const fetchPopularProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("analytics_popular_products")
        .select("*")
        .limit(10);

      if (error) throw error;
      setPopularProducts(data || []);
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  const fetchDownloadData = async () => {
    try {
      const { data, error } = await supabase
        .from("analytics_downloads")
        .select("*")
        .limit(10);

      if (error) throw error;
      setDownloadData(data || []);
    } catch (error) {
      console.error("Error fetching download data:", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = salesData.reduce((sum, day) => sum + (day.revenue || 0), 0);
  const totalOrders = salesData.reduce((sum, day) => sum + (day.order_count || 0), 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground">Loading business intelligence...</p>
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
              Business Intelligence
            </h1>
            <p className="text-muted-foreground">Track your sales, orders, and product performance</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={fetchAllData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
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
                </div>
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">
                    {downloadData.reduce((sum, item) => sum + (item.total_downloads || 0), 0)}
                  </p>
                </div>
                <Download className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
            <TabsTrigger value="downloads">Download Tracking</TabsTrigger>
          </TabsList>

          {/* Order Management Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Management
                </CardTitle>
                <CardDescription>
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="search">Search orders</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by customer, email, or product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div>Customer</div>
                    <div>Product</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Date</div>
                    <div>Actions</div>
                  </div>
                  
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="grid grid-cols-6 gap-4 p-4 border-t hover:bg-muted/20">
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">
                                {order.customer_name || "Unknown"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.customer_email || "No email"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{order.product_name || "Unknown Product"}</span>
                          </div>
                        </div>
                        
                        <div className="font-medium">
                          {formatCurrency(order.amount / 100)}
                        </div>
                        
                        <div>
                          <Badge variant={
                            order.status === 'paid' ? 'default' :
                            order.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {formatDate(order.created_at)}
                        </div>
                        
                        <div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No orders found matching your criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Daily Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.slice(0, 10).map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{formatDate(day.sale_date)}</p>
                            <p className="text-sm text-muted-foreground">{day.order_count} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatCurrency(day.revenue)}</p>
                          <p className="text-sm text-muted-foreground">
                            Avg: {formatCurrency(day.avg_order_value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Popular Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{product.product_name || "Unknown Product"}</p>
                            <p className="text-sm text-muted-foreground">{product.sales_count} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(product.total_revenue)}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(product.avg_price)} avg
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Download Tracking Tab */}
          <TabsContent value="downloads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Analytics
                </CardTitle>
                <CardDescription>
                  Track product download performance and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {downloadData.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="font-medium mb-1">{item.product_name || "Unknown Product"}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="w-3 h-3" />
                            <span>Product ID: {item.product_id.slice(0, 8)}...</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{item.total_downloads}</p>
                          <p className="text-sm text-muted-foreground">Total Downloads</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{item.unique_downloaders}</p>
                          <p className="text-sm text-muted-foreground">Unique Users</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {item.avg_downloads_per_user ? item.avg_downloads_per_user.toFixed(1) : "0"}
                          </p>
                          <p className="text-sm text-muted-foreground">Avg per User</p>
                        </div>
                      </div>
                      
                      {item.total_data_transferred_mb && item.total_data_transferred_mb > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Download className="w-3 h-3" />
                            <span>
                              {item.total_data_transferred_mb.toFixed(2)} MB total transferred
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {downloadData.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No download data available yet</p>
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

export default BusinessIntelligence;