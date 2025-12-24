import { useState } from 'react';
import { Plus, CalendarClock } from 'lucide-react';
import Button from '../ui/Button';

const AddTaskInput = ({ addTask }) => {
    // Task Input State
    const [newTask, setNewTask] = useState("");
    const [newPriority, setNewPriority] = useState("2"); // Default Medium (2)

    // Default scheduled: today if before 6 PM (18:00), else tomorrow
    const [isScheduledForToday, setIsScheduledForToday] = useState(() => {
        return new Date().getHours() < 18;
    });

    // Input Expanded State
    const [isInputExpanded, setIsInputExpanded] = useState(false);

    // Priority Options and colors
    const priorityOptions = [
        { id: '1', label: 'High', color: 'bg-rose-500', hover: 'hover:bg-rose-50 text-rose-600' },
        { id: '2', label: 'Medium', color: 'bg-amber-500', hover: 'hover:bg-amber-50 text-amber-600' },
        { id: '3', label: 'Low', color: 'bg-emerald-500', hover: 'hover:bg-emerald-50 text-emerald-600' }
    ];

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!newTask.trim()) return;

        // Calculate dayOffset for service
        const dayOffset = isScheduledForToday ? 0 : 1;

        addTask({
            title: newTask,
            priority: Number(newPriority),
            dayOffset: dayOffset,
            is_completed: false
        });

        setNewTask("");
        setNewPriority("2");
        // Reset schedule logic based on current time
        setIsScheduledForToday(new Date().getHours() < 18);
    };

    return (
        <div className="fixed bottom-6 left-0 lg:left-64 right-0 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
            <form
                onSubmit={handleSubmit}
                className={`
                    relative group shadow-2xl rounded-2xl bg-white border-2 border-slate-200 transition-all duration-300 overflow-hidden
                    ${isInputExpanded ? 'shadow-emerald-500/10 border-emerald-500/50' : ''}
                `}
                onFocus={() => setIsInputExpanded(true)}
            >
                <div className="p-2">
                    <div className="relative">

                        <input
                            type="text"
                            placeholder="Add a new task..."
                            className="w-full pl-6 pr-20 md:py-4 py-2 pb-2.5 rounded-2xl bg-white outline-none text-lg placeholder:text-slate-400"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />

                        <div className="absolute right-1 top-1 bottom-1">
                            {/* Add Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className="h-10 w-10 rounded-xl p-0 flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer"
                                disabled={!newTask.trim()}
                                style={{
                                    "padding": "5.5px"
                                }}
                            >
                                <Plus className="w-10 h-10" />
                            </Button>
                        </div>
                    </div>

                    {/* Expanded Controls */}
                    <div className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isInputExpanded ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                    `}>
                        <div className="flex items-center justify-between px-2 pb-2">
                            <div className="flex items-center sm:gap-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <span className="hidden sm:inline">Priority:</span>
                                </span>
                                <div className="flex items-center gap-1">
                                    {priorityOptions.map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setNewPriority(p.id)}
                                            className={`
                                                px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer
                                                ${newPriority === p.id
                                                    ? `bg-slate-800 text-white border-slate-800 shadow-sm`
                                                    : `bg-white border-slate-200 text-slate-500 hover:border-slate-300 ${p.hover}`
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${newPriority === p.id ? 'bg-white' : p.color
                                                        }`}
                                                />
                                                {p.id === '2' ? (
                                                    <>
                                                        <span className="sm:inline hidden">Medium</span>
                                                        <span className="sm:hidden inline">Mid</span>
                                                    </>
                                                ) : (
                                                    p.label
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Schedule Today Button */}
                            <button
                                type="button"
                                onClick={() => setIsScheduledForToday(!isScheduledForToday)}
                                className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer select-none
                                    ${isScheduledForToday
                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <CalendarClock className={`w-3.5 h-3.5 ${isScheduledForToday ? 'text-emerald-600' : 'text-slate-400'}`} />
                                Today
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Overlay to close expanded state when clicking outside */}
            {isInputExpanded && (
                <div
                    className="fixed inset-0 -z-10"
                    onClick={() => setIsInputExpanded(false)}
                />
            )}
        </div>
    );
};

export default AddTaskInput;
