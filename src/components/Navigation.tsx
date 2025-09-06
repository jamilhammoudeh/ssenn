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
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-2 pb-4 space-y-1 border-t border-primary/10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative block px-3 py-3 text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  <div className={`absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-primary transition-all duration-200 ${
                    isActive(item.path) ? "scale-x-100" : "scale-x-0"
                  }`}></div>
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