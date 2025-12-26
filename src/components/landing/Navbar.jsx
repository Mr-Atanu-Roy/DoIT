import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Rocket, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
    const { user } = useContext(AuthContext);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex items-center gap-2 font-extrabold text-4xl tracking-tight">
                            <Rocket className="w-7 h-7 text-emerald-600 animate-float" />
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">DoIT</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('features')} className="cursor-pointer text-gray-600 hover:text-brand-600 transition-colors font-medium">
                            Features
                        </button>
                        <button onClick={() => scrollToSection('how-it-works')} className="cursor-pointer text-gray-600 hover:text-brand-600 transition-colors font-medium">
                            How it works
                        </button>
                        <button onClick={() => scrollToSection('screens')} className="cursor-pointer text-gray-600 hover:text-brand-600 transition-colors font-medium">
                            Screens
                        </button>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center">
                        {user ? (
                            <Link
                                to="/today"
                                className="cursor-pointer flex items-center justify-center px-5 py-2.5 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5"
                            >
                                Open App <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="cursor-pointer flex items-center justify-center px-5 py-2.5 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5"
                            >
                                Log in <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
