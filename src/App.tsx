import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Subsidiaries from "./pages/Subsidiaries";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ihsaan from "./pages/Ihsaan";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Marketing chrome (nav + footer) is hidden on the standalone auth screen.
const chromelessRoutes = ["/auth"];

const Layout = () => {
  const { pathname } = useLocation();
  const showChrome = !chromelessRoutes.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showChrome && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subsidiaries" element={<Subsidiaries />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ihsaan" element={<Ihsaan />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business-intelligence"
            element={
              <ProtectedRoute>
                <BusinessIntelligence />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showChrome && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
