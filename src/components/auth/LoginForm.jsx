import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { authService } from '../../services/supabase/auth.service';
import { validate } from '../../utils/validators';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerificationPending, setIsVerificationPending] = useState(false);
    const [isMagicLinkMode, setIsMagicLinkMode] = useState(false); // Toggle state
    const [magicLinkSent, setMagicLinkSent] = useState(false); // Success state
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        const emailValidation = validate.email(formData.email);
        if (!emailValidation.status) {
            newErrors.email = emailValidation.message;
        }

        // Only validate password if NOT in magic link mode
        if (!isMagicLinkMode) {
            const passwordValidation = validate.password(formData.password);
            if (!passwordValidation.status) {
                newErrors.password = passwordValidation.message;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (authError) setAuthError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setAuthError('');

        try {
            if (isMagicLinkMode) {
                // Magic Link Flow
                const { error } = await authService.sendPasswordlessLoginLink(formData.email);

                if (error) {
                    setAuthError(error.message || 'Failed to send login link');
                } else {
                    setMagicLinkSent(true);
                }
                setIsLoading(false);
            } else {
                // Password Flow
                const { error } = await authService.logIn(formData.email, formData.password);

                if (error) {
                    setAuthError(error.message || 'Failed to sign in');

                    // check if error is "Email not confirmed"
                    if (error.message === 'Email not confirmed') {
                        setIsVerificationPending(true);
                    }
                    setIsLoading(false);
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            setAuthError('An unexpected error occurred');
            setIsLoading(false);
        }
    };

    if (magicLinkSent) {
        return (
            <div className="text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                    <Mail size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Check your email</h3>
                <p className="text-slate-600 text-sm">
                    We've sent a magic login link to <strong>{formData.email}</strong>.
                    <br />Click the link to sign in instantly.
                </p>
                <div className="pt-4">
                    <Button
                        variant="secondary"
                        className="w-full cursor-pointer"
                        onClick={() => {
                            setMagicLinkSent(false);
                            setFormData(prev => ({ ...prev, email: '' }));
                        }}
                    >
                        Use a different email
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {authError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {authError}
                    {isVerificationPending && (
                        <Link to="/verify-email" className="ml-2 font-medium underline text-red-600">
                            Verify Email
                        </Link>
                    )}
                </div>
            )}

            {/* Mode Toggle */}
            <div className="flex justify-center pb-2">
                <button
                    type="button"
                    onClick={() => {
                        setIsMagicLinkMode(!isMagicLinkMode);
                        setAuthError('');
                        setErrors({});
                    }}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                    {isMagicLinkMode ? 'Log in with password instead' : 'Log in with magic link instead'}
                </button>
            </div>

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={Mail}
                error={errors.email}
                required
            />

            {!isMagicLinkMode && (
                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        icon={Lock}
                        error={errors.password}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[39px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            )}

            {!isMagicLinkMode && (
                <div className="flex items-center justify-end text-sm">
                    <Link to="/forgot-password" className="font-medium text-emerald-500 hover:text-emerald-600 transition-colors">
                        Forgot password?
                    </Link>
                </div>
            )}

            <Button type="submit" variant="primary" className="w-full py-2.5 cursor-pointer" isLoading={isLoading} disabled={isLoading}>
                {isMagicLinkMode ? (
                    <>Send Login Link <ArrowRight className="w-4 h-4 ml-2" /></>
                ) : (
                    <>Log In <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
            </Button>

            <div className="text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Create an account
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
