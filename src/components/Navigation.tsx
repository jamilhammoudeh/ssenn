import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subsidiaries", path: "/subsidiaries" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500 ease-out">
                SSENN
              </div>
              <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-lg"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm text-muted-foreground font-medium tracking-wide">
                Education Holdings
              </span>
              <div className="w-full h-px bg-gradient-primary opacity-50 mt-1"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span className="relative z-10 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                  {item.name}
                </span>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform origin-left transition-all duration-300 ${
                  isActive(item.path) 
                    ? "scale-x-100" 
                    : "scale-x-0 group-hover:scale-x-100"
                }`}></div>
                {!isActive(item.path) && (
                  <div className="absolute -inset-2 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3 bg-gradient-card border-t border-primary/10 rounded-b-2xl backdrop-blur-xl">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg group ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10 shadow-card"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-primary rounded-r-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;