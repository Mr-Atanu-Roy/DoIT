import { Rocket } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-100 border-t border-slate-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 font-extrabold text-4xl tracking-tight">
                        <Rocket className="w-7 h-7 text-emerald-600" />
                        <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">DoIT</span>
                    </div>

                    {/* <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
                        <Link to="#" className="hover:text-brand-600 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-brand-600 transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-brand-600 transition-colors">Twitter</Link>
                        <Link to="#" className="hover:text-brand-600 transition-colors">GitHub</Link>
                    </div> */}

                    <div className="text-sm text-slate-400">
                        © {new Date().getFullYear()} DoIT App. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
