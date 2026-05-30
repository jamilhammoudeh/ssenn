import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Gates a route behind authentication. Unauthenticated visitors are sent to
 * /auth (remembering where they were headed). Note: this checks that a user is
 * signed in; it does not enforce an "admin" role. Role-level access should be
 * enforced with Supabase row-level security / a roles table.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
