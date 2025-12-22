import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const validate = () => {
        if (!email) {
            setError('Email is required');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

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
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={Mail}
                error={error}
                required
            />

            <p className="text-sm text-slate-500 leading-relaxed text-center">
                Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            <Button type="submit" variant="primary" className="w-full py-2.5 cursor-pointer" isLoading={isLoading} disabled={isLoading}>
                Send Reset Link
            </Button>

            <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
