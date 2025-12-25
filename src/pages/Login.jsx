import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { Rocket } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const Login = () => {
    usePageTitle("Login");

    //redirect to home if user is already logged in
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4 shadow-sm ">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
