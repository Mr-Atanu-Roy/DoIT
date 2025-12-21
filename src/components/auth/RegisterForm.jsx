import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={User}
                required
            />

            <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                icon={Mail}
                required
            />

            <div className="relative">
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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



            <Button type="submit" variant="primary" className="w-full py-2.5 mt-2" isLoading={isLoading}>
                Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center text-sm text-slate-500 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Sign in
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
