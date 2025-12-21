import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Send } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    };



    if (isSent) {
        return (
            <div className="text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                    <Send size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Check your email</h3>
                <p className="text-slate-600 text-sm">
                    We've sent password reset instructions to your email address.
                </p>
                <div className="pt-4">
                    <Link to="/login">
                        <Button variant="secondary" className="w-full cursor-pointer">
                            Resend Email
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                    className="absolute right-3 top-[39px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>



            <Button type="submit" variant="primary" className="w-full py-2.5 mt-2 cursor-pointer" isLoading={isLoading}>
                Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center text-sm text-slate-500 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">
                    Sign in
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
