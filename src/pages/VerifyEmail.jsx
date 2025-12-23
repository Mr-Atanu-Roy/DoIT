import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../services/supabase/auth.service';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { validate } from '../utils/auth.validators';

const VerifyEmail = () => {
    const { user } = useAuth();

    //redirect to home if user is already logged in
    if (user) {
        return <Navigate to="/" />;
    }

    const location = useLocation();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

    useEffect(() => {
        // Pre-fill email if user is logged in or passed via location state
        if (user?.email) {
            setEmail(user.email);
        } else if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [user, location]);


    const validateForm = () => {
        const emailValidation = validate.email(email);
        if (!emailValidation.status) {
            setError(emailValidation.message);
        }

        return emailValidation.status;
    };

    const handleResend = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const { error } = await authService.resendVerificationEmail(email);

            if (error) {
                setMessage({ type: 'error', text: error.message });
            } else {
                setMessage({
                    type: 'success',
                    text: 'Verification email sent! Please check your inbox.'
                });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-teal-100/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4 shadow-sm">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verify Your Email</h1>
                    <p className="text-slate-500 mt-2">
                        You need to verify your email address to access your account.
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {message.type === 'success' ? <Send className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                        <span className="text-sm font-medium">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleResend} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        error={error}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        icon={Mail}
                        required
                        disabled={isLoading} // Allow editing if they need to fix a typo
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-2.5 cursor-pointer"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Send Verification Email
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

export default VerifyEmail;
