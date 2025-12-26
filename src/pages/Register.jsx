import RegisterForm from '../components/auth/RegisterForm';
import { Rocket } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';

const Register = () => {
    usePageTitle("Create Account");

    //redirect to home if user is already logged in
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/today" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Join DOIT</h1>
                    <p className="text-slate-500 mt-2 text-sm">Start your productivity journey today.</p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
