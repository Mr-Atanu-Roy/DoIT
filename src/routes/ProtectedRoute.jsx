
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2, Rocket } from 'lucide-react';
import { authService } from '../services/supabase/auth.service';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex items-center gap-2 font-extrabold text-4xl tracking-tight">
                    <Rocket className="w-7 h-7 text-emerald-600 animate-float" />
                    <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">DoIT</span>
                </div>
                <Loader2 className="ml-3 w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!user) {
        // Redirect to login page but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check for email verification
    if (user && !authService.isEmailVerified(user)) {
        return <Navigate to="/verify-email" replace />;
    }

    return children;
};

export default ProtectedRoute;
