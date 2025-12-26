import secondaryImg from '../../assets/images/landing/home_page_tab.png';
import primaryImg from '../../assets/images/landing/today.png';

export default function Screens({ version = '1.0' }) {
    return (
        <section id="screens" className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT COLUMN: Text Content */}
                    <div className="w-full lg:w-1/3 text-center lg:text-left z-10">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            V{version} is Live
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Master your day with <br />
                            <span className="text-brand-500">distraction-free focus</span>
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            See what a calm, focused day actually looks like.
                        </p>
                    </div>

                    {/* RIGHT COLUMN: Visual Proof (Responsive) */}
                    <div className="w-full lg:w-2/3 relative mt-8 lg:mt-0">
                        {/* Decorative Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-200/20 rounded-full blur-3xl -z-10"></div>

                        <div className="relative">
                            {/* Secondary Screenshot (Background/Floating) */}
                            <div className="absolute -left-4 sm:-left-12 top-8 sm:top-12 w-[60%] z-0 transform -rotate-2 opacity-90">
                                <img
                                    src={secondaryImg}
                                    alt="Task Organization"
                                    className="w-full rounded-xl shadow-lg border border-slate-200/50"
                                />
                            </div>

                            {/* Primary Screenshot (Foreground) */}
                            <div className="relative z-10 w-[85%] ml-auto transform rotate-1 transition-transform duration-700 hover:scale-[1.02]">

                                <img
                                    src={primaryImg}
                                    alt="DoIT Today View"
                                    className="w-full rounded-xl shadow-2xl border border-slate-200/50"
                                />
                                {/* Glass shine effect */}
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
