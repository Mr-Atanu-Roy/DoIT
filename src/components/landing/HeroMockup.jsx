import {
    ChevronDown,
    CalendarClock,
    Circle,
    RotateCcw,
    Trash2,
    EllipsisVertical,
    Plus
} from 'lucide-react';

const HeroMockup = () => {

    const total = 6;
    const completed = 2;
    const percentage = Number((completed / total) * 100).toFixed(0);

    return (
        <div className="w-full h-full bg-slate-50 overflow-hidden flex flex-col relative rounded-2xl">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-start gap-2">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400">
                    </div>
                    <div className="w-3 h-3 rounded-full bg-amber-400">
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-400">
                    </div>
                </div>
            </div>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full relative">
                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between sm:gap-3">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 capitalize">Good afternoon</h3>
                        <h3 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent mb-1 capitalize">
                            Atanu
                        </h3>
                        <div className="flex items-center justify-between text-slate-500 text-sm mb-4">
                            <span>You have 4 more tasks to complete for today.</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-3xl bg-emerald-500 shadow-xl shadow-emerald-200/50 w-full sm:w-[320px] text-white relative overflow-hidden">
                        <div className="text-emerald-100 text-sm font-medium mb-4">Daily Progress</div>
                        <div className="flex items-end justify-between mb-4">
                            <div className="text-2xl font-bold tracking-tight">{completed}/{total} <span className="text-xs font-semibold opacity-90">Completed</span></div>
                            <div className="text-3xl font-bold tracking-tight">{percentage}%</div>
                        </div>
                        <div className="h-3 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <div className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-sm" style={{ width: '33.3333%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 space-y-4">
                    <div className="flex gap-3 items-end justify-between flex-wrap">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative inline-block">
                                <span className="text-slate-400 font-normal inline sm:hidden text-xs ml-1.5 mb-1">Status:</span>
                                <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer select-none group bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50">
                                    <span className="text-slate-400 font-normal sm:inline hidden">Status:</span>
                                    <span className="font-semibold text-slate-800">Incompleted</span>
                                    <ChevronDown className="w-3 h-3 text-slate-400 transition-transform duration-200" />
                                </button>
                            </div>
                            <div className="relative inline-block">
                                <span className="text-slate-400 font-normal inline sm:hidden text-xs ml-1.5 mb-1">Priority:</span>
                                <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer select-none group bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50">
                                    <span className="text-slate-400 font-normal sm:inline hidden">Priority:</span>
                                    <span className="font-semibold text-slate-600">All</span>
                                    <ChevronDown className="w-3 h-3 text-slate-400 transition-transform duration-200" />
                                </button>
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border cursor-pointer select-none bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm">
                            <CalendarClock className="w-4 h-4 text-emerald-600" />
                            Today
                        </button>
                    </div>
                </div>

                <div className="pb-[65px] space-y-3">
                    {/* Task 1 */}
                    <div className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white border-slate-200  border-l-4 border-l-rose-500">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button className="mt-0.5 shrink-0 transition-colors duration-200 outline-none cursor-pointer rounded-full text-slate-300 hover:text-emerald-400">
                                <Circle className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                <span className="font-medium text-xs sm:text-sm md:text-base leading-tight transition-all duration-200 text-slate-700 line-clamp-2 md:line-clamp-1">
                                    Finish assignments of module 2: Pytorch bootcamp
                                </span>
                                <div className="flex items-center gap-2 text-xs flex-wrap h-5">
                                    <span className="px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wide bg-rose-50 text-rose-600 border-rose-100">
                                        High
                                    </span>
                                    <span className="text-[10px] sm:text-[11px] text-slate-400">Added 2 days ago</span>
                                    <div className="flex items-center gap-1 ml-1 text-amber-500" title="Postponed 1 times">
                                        <RotateCcw className="w-3 h-3" />
                                        <span className="font-medium md:hidden">1x</span>
                                        <span className="font-medium hidden md:block">1x Postponed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ml-2">
                            <div className="hidden md:flex items-center gap-1  transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg">
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="md:hidden relative">
                                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                                    <EllipsisVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Task 2 */}
                    <div className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white border-slate-200 shadow-2xl border-l">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button className="mt-0.5 shrink-0 transition-colors duration-200 outline-none cursor-pointer rounded-full text-slate-300 hover:text-emerald-400">
                                <Circle className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                <span className="font-medium text-xs sm:text-sm md:text-base leading-tight transition-all duration-200 text-slate-700 line-clamp-2 md:line-clamp-1">
                                    DoIT-FIX: time zone issue
                                </span>
                                <div className="flex items-center gap-2 text-xs flex-wrap h-5">
                                    <span className="px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-600 border-amber-100">
                                        Mid
                                    </span>
                                    <span className="text-[10px] sm:text-[11px] text-slate-400">Added an hour ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ml-2">
                            <div className="hidden md:flex items-center gap-1  transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg">
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="md:hidden relative">
                                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                                    <EllipsisVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Task 3 */}
                    <div className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white border-slate-200  border-l">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button className="mt-0.5 shrink-0 transition-colors duration-200 outline-none cursor-pointer rounded-full text-slate-300 hover:text-emerald-400">
                                <Circle className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                <span className="font-medium text-xs sm:text-sm md:text-base leading-tight transition-all duration-200 text-slate-700 line-clamp-2 md:line-clamp-1">
                                    DoIT:Replace the image in hero by a actual html code (3D)
                                </span>
                                <div className="flex items-center gap-2 text-xs flex-wrap h-5">
                                    <span className="px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-600 border-emerald-100">
                                        Low
                                    </span>
                                    <span className="text-[10px] sm:text-[11px] text-slate-400">Added yesterday</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ml-2">
                            <div className="hidden md:flex items-center gap-1  transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg">
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="md:hidden relative">
                                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                                    <EllipsisVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            {/* Input Form Mockup */}
            <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 w-full">
                <div className="relative group shadow-2xl rounded-2xl bg-white border-2 border-slate-200 overflow-hidden">
                    <div className="p-2">
                        <div className="relative">
                            <div className="w-full pl-6 pr-20 md:py-4 py-2 rounded-2xl bg-white text-lg text-slate-400">
                                Add a new task...
                            </div>
                            <div className="absolute right-1 top-1 bottom-1">
                                <button type="button" className="inline-flex items-center justify-center rounded-xl bg-emerald-500 text-white h-10 w-10 shadow-md">
                                    <Plus className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroMockup;
