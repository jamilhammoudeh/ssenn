import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="font-display text-7xl font-semibold text-primary">
          404
        </div>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
