import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../services/supabase/client';
import { authService } from '../services/supabase/auth.service';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ResetPassword = () => {
    //redirect to home if user is already logged in
    const { user } = useAuth();
    if (user) {
        if (!user.email_confirmed_at) {
            return <Navigate to="/verify-email" />;
        }
        return <Navigate to="/" />;
    }


    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Security check: If we have a session but email is NOT verified, 
        // strictly speaking we should probably kick them out, but for reset password 
        // specifically, usually the link grants access. 
        // However, user plan said: If session exists AND email NOT verified -> Sign out & Redirect.
        const checkSession = async () => {
            const { data } = await authService.getCurrentSession();
            if (data?.session?.user && !authService.isEmailVerified(data.session.user)) {
                await authService.logOut();
                navigate('/verify-email', { replace: true });
            }
        };
        checkSession();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in text-center border border-slate-100">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Password Reset!</h2>
                    <p className="text-slate-600 mb-6">
                        Your password has been successfully reset. You can now login with your new password.
                    </p>
                    <Link to="/login">
                        <Button variant="primary" className="w-full">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-float" />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4 shadow-sm">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Set New Password</h1>
                    <p className="text-slate-500 mt-2">Enter your new password below.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Input
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            icon={Lock}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-2.5 cursor-pointer"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Reset Password
                    </Button>
                </form>

                <div className="text-center pt-6">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
