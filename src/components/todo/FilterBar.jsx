import { CalendarClock } from 'lucide-react';
import PriorityFilter from '../ui/PriorityFilter';
import IsCompletedFilter from '../ui/IsCompletedFilter';
import IsOverdueFilter from '../ui/IsOverdueFilter';

const FilterBar = ({ filters, setFilters, day = "ALL", setDay = () => { }, showStatus, showPriority, showOverdue }) => {
    // day: 0 is today, 1 is tomorrow.
    const isTodayFilterActive = day === 0;

    const handleDayToggle = () => {
        setDay(isTodayFilterActive ? 1 : 0);
    };


    return (
        <>
            {/* Header & Filters */}
            <div className="mb-8 space-y-4">

                {/* Filters */}
                <div className="flex gap-3 items-end justify-between flex-wrap">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Status Filter */}
                        {
                            showStatus && (
                                <IsCompletedFilter
                                    status={filters.status}
                                    setIsCompleteFilter={(newStatus) => setFilters(prev => ({ ...prev, status: newStatus }))}
                                    disabled={day === 1}
                                />
                            )
                        }

                        {/* Priority Filter */}
                        {showPriority && (
                            <PriorityFilter
                                priorityFilter={filters.priority}
                                setPriorityFilter={(newPriority) => setFilters(prev => ({ ...prev, priority: newPriority }))}
                            />
                        )}

                        {/* Overdue Filter */}
                        {
                            showOverdue && (
                                <IsOverdueFilter
                                    status={filters.overdue || 'all'}
                                    setIsOverdueFilter={(newStatus) => setFilters(prev => ({ ...prev, overdue: newStatus }))}
                                />
                            )
                        }

                    </div>

                    {/* Date Filter Toggle */}
                    {day !== 'ALL' && (
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
                    )}
                </div>
            </div>
        </>
    );
};

export default FilterBar;
