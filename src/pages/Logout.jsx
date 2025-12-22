
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ArrowRight } from 'lucide-react';
import { authService } from '../services/supabase/auth.service';
import Button from '../components/ui/Button';

const Logout = () => {
    useEffect(() => {
        const performLogout = async () => {
            // We can safely ignore errors here as we want to show the logout screen anyway
            await authService.logOut();
        };
        performLogout();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-500 mb-6 shadow-sm">
                    <LogOut className="w-8 h-8 ml-1" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">You've been logged out</h1>
                <p className="text-slate-500 mb-8">
                    We hope to see you again soon! Your session has been safely closed.
                </p>

                <div className="space-y-3">
                    <Link to="/login">
                        <Button variant="primary" className="w-full cursor-pointer">
                            Log In Again <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Logout;
