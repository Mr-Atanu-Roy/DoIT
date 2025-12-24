import { ChevronDown, CalendarClock } from 'lucide-react';

const FilterBar = ({ filters, setFilters, day, setDay }) => {
    // day: 0 is today, 1 is tomorrow.
    const isTodayFilterActive = day === 0;

    const handleDayToggle = () => {
        setDay(isTodayFilterActive ? 1 : 0);
    };

    return (
        <>
            {/* Header & Filters */}
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                        {isTodayFilterActive ? "Today's Tasks" : "Tomorrow's Tasks"}
                    </h2>
                    <div className="text-slate-500 text-sm font-medium text-right">
                        <span className="md:hidden">
                            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="hidden md:inline">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Status Filter */}
                        <div className="relative group">
                            <select
                                className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:border-emerald-300"
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Priority Filter */}
                        <div className="relative group">
                            <select
                                className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:border-emerald-300"
                                value={filters.priority}
                                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                            >
                                <option value="all">Any Priority</option>
                                <option value="1">High Priority</option>
                                <option value="2">Medium Priority</option>
                                <option value="3">Low Priority</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Date Filter Toggle */}
                    <button
                        onClick={handleDayToggle}
                        className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border cursor-pointer select-none
                        ${isTodayFilterActive
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm'
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                            }
                    `}
                    >
                        <CalendarClock className={`w-4 h-4 ${isTodayFilterActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                        Today
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterBar;
