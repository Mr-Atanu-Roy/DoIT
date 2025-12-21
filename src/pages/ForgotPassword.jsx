import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { LockKeyhole } from 'lucide-react';

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-float" />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-bounce-in relative z-10 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-4 shadow-sm">
                        <LockKeyhole className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password?</h1>
                </div>

                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPassword;
