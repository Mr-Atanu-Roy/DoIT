import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Lock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function CTA() {
    const { user } = useContext(AuthContext);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-4xl p-12 md:p-20 text-center relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-4xl">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-brand-50/50 via-transparent to-transparent opacity-60"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <Rocket className="w-10 h-10 text-brand-500" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Start planning today — <br />
                            <span className="text-brand-500">that's all you need.</span>
                        </h2>

                        <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
                            Be calm achievers. It's completely free.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            {user ? (
                                <Link
                                    to="/today"
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    Open App <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        Get Started Free <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                            <Lock className="w-4 h-4 mb-0.5" />
                            Secure & Private by default
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
