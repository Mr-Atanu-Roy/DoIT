import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Send } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { authService } from '../../services/supabase/auth.service';
import { validate } from '../../utils/validators';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [authError, setAuthError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        const fullNameValidation = validate.fullName(formData.fullName);
        if (!fullNameValidation.status) {
            newErrors.fullName = fullNameValidation.message;
        }

        const emailValidation = validate.email(formData.email);
        if (!emailValidation.status) {
            newErrors.email = emailValidation.message;
        }

        const passwordValidation = validate.password(formData.password);
        if (!passwordValidation.status) {
            newErrors.password = passwordValidation.message;
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
            const { error } = await authService.register(formData.email, formData.password, formData.fullName);

            if (error) {
                setAuthError(error.message || 'Failed to register');
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsSent(true);
            }
        } catch (err) {
            setAuthError('An unexpected error occurred');
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                    <Send size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Check your email</h3>
                <p className="text-slate-600 text-sm">
                    We've sent a confirmation link to your email address. You need to verify your account before logging in.
                </p>
                <div className="pt-4">
                    <Link to="/login">
                        <Button variant="secondary" className="w-full cursor-pointer">
                            Log In Now
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {authError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {authError}
                </div>
            )}

            <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                icon={User}
                error={errors.fullName}
                required
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
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
                    placeholder="Create a password"
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

            <Button type="submit" variant="primary" className="w-full py-2.5 mt-2 cursor-pointer" isLoading={isLoading} disabled={isLoading}>
                Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center text-sm text-slate-500 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">
                    Log in
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
