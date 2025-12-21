import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                required
            />

            <div className="relative">
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    icon={Lock}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[39px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 transition-colors" />
                    <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" class="font-medium text-emerald-500 hover:text-emerald-600 transition-colors">
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full py-2.5" isLoading={isLoading}>
                Sign In <ArrowRight className="w-4 h-4 ml-2" />
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
