import { Trash2, CircleCheckBig, Circle, RotateCcw, MoreVertical, TriangleAlert, CalendarClock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getRelativeTime, isOverdue } from '../../utils/utils';


const TodoItem = ({ todo, day, markTask, deleteTask, rescheduleTaskDay, getSelectedTask }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToday, setIsToday] = useState(!Boolean(day));
    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Priority styles helper
    const getPriorityBadgeStyle = (priority) => {
        switch (String(priority)) {
            case '1': return 'bg-rose-50 text-rose-600 border-rose-100'; // High
            case '2': return 'bg-amber-50 text-amber-600 border-amber-100'; // Medium
            case '3': return 'bg-emerald-50 text-emerald-600 border-emerald-100'; // Low
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getPriorityLabel = (priority) => {
        switch (String(priority)) {
            case '1': return 'High';
            case '2': return 'Mid';
            case '3': return 'Low';
            default: return '';
        }
    };

    const getPriorityBorderColor = (priority) => {
        switch (String(priority)) {
            case '1': return 'border-l-rose-500';
            default: return '';
        }
    };

    const isHighPriority = String(todo.priority) === '1';

    const handlePostpone = (e) => {
        e.stopPropagation();
        rescheduleTaskDay(todo.id, Number(isToday));
        setIsMenuOpen(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteTask(todo.id);
        setIsMenuOpen(false);
    };

    // Relative time logic
    const getRelativeTimeText = () => {
        if (todo.is_completed) {
            // For completed tasks, show "Done [time]" using completed_on
            return `Done ${getRelativeTime(todo.completed_on)}`;
        }
        if (isOverdue(todo.scheduled_for)) {
            // For overdue tasks, show "Due [duration]" using scheduled_for
            return (
                <span className="flex items-center gap-1">
                    <TriangleAlert className="w-3 h-3" />
                    Due {getRelativeTime(todo.scheduled_for, true)}
                </span>
            );
        }
        // For incomplete, not overdue tasks, show "Added [time]" using created_at
        return `Added ${getRelativeTime(todo.created_at)}`;
    };

    const isTaskOverdue = !todo.is_completed && isOverdue(todo.scheduled_for);

    return (
        <div
            onClick={() => getSelectedTask(todo.id)}
            className={`
                group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200 cursor-pointer
                ${todo.is_completed
                    ? 'bg-emerald-50/50 border-slate-100'
                    : 'bg-white border-slate-200 hover:shadow-sm'
                }
                
                ${isHighPriority && !todo.is_completed ? 'border-l-4 ' + getPriorityBorderColor(todo.priority) : 'border-l'}
            `}
        >
            <div className="flex items-start gap-3 flex-1 min-w-0">
                {isToday
                    ? (<button
                        onClick={(e) => {
                            e.stopPropagation();
                            markTask(todo.id, !todo.is_completed);
                        }}
                        className={`mt-0.5 shrink-0 transition-colors duration-200 outline-none cursor-pointer rounded-full ${todo.is_completed ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-400'}`}
                        aria-label={todo.is_completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {todo.is_completed ? (
                            <CircleCheckBig className="w-6 h-6" />
                        ) : (
                            <Circle className="w-6 h-6" />
                        )}
                    </button>)
                    : (
                        <CalendarClock className="w-6 h-6 text-emerald-400 group-hover:text-emerald-500 transition-all" />
                    )
                }

                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    {/* Title */}
                    <span
                        className={`
                            font-medium text-sm sm:text-base leading-tight transition-all duration-200
                            ${todo.is_completed ? 'text-slate-400 line-through opacity-80' : 'text-slate-700'}
                            line-clamp-2 md:line-clamp-1
                        `}
                    >
                        {todo.title}
                    </span>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-2 text-xs flex-wrap h-5">

                        {/* Priority Badge */}
                        {!todo.is_completed && todo.priority && (
                            <span className={`
                                px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wide
                                ${getPriorityBadgeStyle(todo.priority)}
                            `}>
                                {getPriorityLabel(todo.priority)}
                            </span>
                        )}

                        {/* Relative Time */}
                        <span className={`text-[11px] ${isTaskOverdue ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
                            {getRelativeTimeText()}
                        </span>

                        {/* Postpone Indicator */}
                        {todo.postpone_count > 0 && (todo.postpone_count > 0 || !todo.is_completed) && (
                            <div className={`flex items-center gap-1 ml-1 ${todo.postpone_count > 3 ? 'text-red-500' : 'text-amber-500'}`} title={`Postponed ${todo.postpone_count} times`}>
                                <RotateCcw className="w-3 h-3" />
                                <span className="font-medium md:hidden">{todo.postpone_count}x</span>
                                <span className="font-medium hidden md:block">{todo.postpone_count}x Postponed</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center ml-2">

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-1">
                    {
                        !todo.is_completed && (
                            <button
                                onClick={handlePostpone}
                                className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                                aria-label="Reschedule to tomorrow"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        )
                    }
                    <button
                        onClick={handleDelete}
                        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
                        aria-label="Delete task"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Actions (Menu) */}
                <div className="md:hidden relative" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-2 text-slate-400 hover:text-slate-600 focus:outline-none rounded-lg active:bg-slate-100"
                        aria-label="More options"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                        <div className="text-xs absolute right-0 top-full mt-1 w-48 bg-white border border-slate-100 shadow-lg rounded-xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            {
                                !todo.is_completed && (
                                    <button
                                        onClick={handlePostpone}
                                        className="w-full text-left px-4 py-3 flex items-center gap-2 text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4 text-amber-500" />
                                        <span>
                                            {isToday
                                                ? 'Postpone to tomorrow'
                                                : 'Move to today'
                                            }
                                        </span>
                                    </button>
                                )
                            }
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-3 flex items-center gap-2 text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete task</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
