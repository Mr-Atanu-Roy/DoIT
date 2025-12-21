import LoginForm from '../components/auth/LoginForm';
import { Rocket } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4 shadow-sm transform transition-transform hover:scale-110 duration-300">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 text-sm">Sign in to JustDOIT and start achieving.</p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
