import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Initiatives", path: "/subsidiaries" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/lovable-uploads/f942f89d-5e0c-4c1b-a325-ebd8a52af9d0.png"
              alt="SSENN"
              className="h-9 w-9 object-contain"
            />
            <span className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                SSENN
              </span>
              <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:inline">
                Education Holdings
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
                data-active={isActive(item.path)}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Button asChild size="sm" className="ml-2">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" weight="regular" />
              ) : (
                <List className="h-5 w-5" weight="regular" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-border/70 pb-6 pt-2 md:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-border/40 py-3.5 text-base transition-colors ${
                    isActive(item.path)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-5">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get in touch
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
