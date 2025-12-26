import { Calendar, CirclePlay, RefreshCw } from 'lucide-react';

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-linear-to-b from-brand-50 via-white to-white relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent pointer-events-none -z-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-3xl pointer-events-none -z-10 -translate-y-1/2 translate-x-1/3"></div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 border-brand-200 border-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-brand-500 mr-2"></span>
                        Simple Workflow
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Focus on work, <br />
                        not on <span className="text-brand-600">managing lists.</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        A distraction-free system designed to help you capture tasks, execute deeply, and reflect on your progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1: Plan Today */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 text-rose-500">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">1. Plan today</h3>
                        <p className="text-slate-500 mb-10 leading-relaxed text-sm">
                            Start your day with intention. Add tasks for today or quickly defer them to tomorrow. Keep your daily list short and achievable.
                        </p>

                        {/* Mockup: Task List */}
                        <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                    <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                    <div className="h-2 w-32 bg-slate-200 rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-3 justify-end mt-2">
                                    <div className="px-2 py-1 bg-rose-100 text-rose-600 text-[10px] uppercase font-bold rounded">Scheduled</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Do the work */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 text-brand-500">
                            <CirclePlay className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">2. Do the work</h3>
                        <p className="text-slate-500 mb-10 leading-relaxed text-sm">
                            Enter focus mode. We hide the noise so you can execute on your active tasks one by one without getting overwhelmed.
                        </p>

                        {/* Mockup: Focus Time */}
                        <div className="w-full bg-brand-50 rounded-xl p-6 border border-brand-100 mt-auto text-center">
                            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest block mb-2">Focus Time</span>
                            <div className="text-3xl font-mono font-bold text-slate-900 mb-3">24:59</div>
                            <div className="w-full h-1.5 bg-brand-200 rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-brand-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Reflect & Reschedule */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 text-amber-500">
                            <RefreshCw className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">3. Reflect & Reschedule</h3>
                        <p className="text-slate-500 mb-10 leading-relaxed text-sm">
                            End your day by reviewing progress. Mark tasks as done, postpone what's left, or reflect on your wins to stay motivated.
                        </p>

                        {/* Mockup: Daily Goal */}
                        <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
                            <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-700">
                                <span>Daily Progress</span>
                                <span className="text-amber-600">100%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                                <div className="w-full h-full bg-amber-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                                    <span className="text-white text-[8px]">✓</span>
                                </div>
                                5/5 Completed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
