import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import HeroMockup from './HeroMockup';

export default function Hero({ version = '1.0' }) {
    const { user } = useContext(AuthContext);

    const scrollToHowItWorks = () => {
        const element = document.getElementById('how-it-works');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-22 lg:pb-28 overflow-hidden bg-white">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute top-40 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-center">

                    {/* Left Column: Text & CTA */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-8">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            V{version} is Live
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Focus on today. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-brand-400">
                                Everything else
                            </span> can wait.
                        </h1>

                        <p className="text-lg sm:text-x text-slate-500 mb-10 max-w-lg">
                            Clear the mental clutter. DoIT is the distraction-free workspace designed to help you achieve your most important goals, one day at a time.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                            {user ? (
                                <Link
                                    to="/today"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5"
                                >
                                    Open App <ArrowUpRight className="ml-2 w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5"
                                >
                                    Open App <ArrowUpRight className="ml-2 w-5 h-5" />
                                </Link>
                            )}

                            <button
                                onClick={scrollToHowItWorks}
                                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                            >
                                <CirclePlay className="mr-2" />
                                See how it works
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            {/* Avatar Stack */}
                            {/* <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="User" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" alt="User" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-medium">
                                    +9k
                                </div>
                            </div> */}
                            <div className="text-sm text-slate-500">
                                Trusted by productive people
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Image */}
                    <div className="relative mt-12 lg:mt-0 perspective-1000 flex justify-center lg:justify-end">
                        {/* Decorative blob behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-tr from-brand-100/50 to-emerald-100/50 rounded-full blur-3xl -z-10"></div>

                        {/* Reduced size container with enhanced 3D effect */}
                        <div className="relative w-full max-w-[500px] transform lg:-rotate-y-12 lg:rotate-x-6 lg:-rotate-z-2 transition-transform hover:transform-none duration-1000 ease-out shadow-2xl shadow-brand-900/10 rounded-2xl bg-white border border-slate-200">
                            <HeroMockup />
                            {/* Floating elements effect */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-500 rounded-2xl -z-10 opacity-20 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
