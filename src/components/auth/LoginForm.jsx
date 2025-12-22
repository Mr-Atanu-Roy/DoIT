import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { authService } from '../../services/supabase/auth.service';

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
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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

        if (!validate()) return;

        setIsLoading(true);
        setAuthError('');

        try {
            const { error } = await authService.logIn(formData.email, formData.password);

            if (error) {
                setAuthError(error.message || 'Failed to sign in');

                // check if error is "Email not confirmed"
                if (error.message === 'Email not confirmed') {
                    setIsVerificationPending(true);
                }
                setIsLoading(false);
            } else {
                // Success, redirect happens automatically via auth state change listener usually, 
                // or we can manually redirect. Detailed plan says "On success -> redirect to Today".
                navigate('/');
            }
        } catch (err) {
            setAuthError('An unexpected error occurred');
            setIsLoading(false);
        }
    };

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

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="cursor-pointer w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 transition-colors" />
                    <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="font-medium text-emerald-500 hover:text-emerald-600 transition-colors">
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full py-2.5 cursor-pointer" isLoading={isLoading} disabled={isLoading}>
                Log In <ArrowRight className="w-4 h-4 ml-2" />
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
