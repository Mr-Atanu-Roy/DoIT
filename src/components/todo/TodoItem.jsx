import { Trash2, CircleCheckBig, Circle, RotateCcw } from 'lucide-react';

const TodoItem = ({ todo, markTask, deleteTask, rescheduleTaskDay, getSelectedTask }) => {
    // Helper to format date
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Never';
        return new Date(timestamp).toLocaleString('en-GB', {
            day: 'numeric', month: 'short',
            hour: '2-digit', minute: '2-digit', hour12: false
        });
    };

    // Format just date helper
    const formatJustDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short'
        });
    };

    // Priority color helper
    const getPriorityColor = (priority) => {
        switch (String(priority)) { // Ensure string comparison
            case '1': return 'bg-rose-500'; // High
            case '2': return 'bg-amber-500'; // Medium
            case '3': return 'bg-emerald-500'; // Low
            default: return 'bg-slate-400';
        }
    };

    const getPriorityLabel = (priority) => {
        switch (String(priority)) {
            case '1': return 'High';
            case '2': return 'Medium';
            case '3': return 'Low';
            default: return 'Normal';
        }
    }

    return (
        <div
            className={`
        group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200
        ${todo.is_completed
                    ? 'bg-emerald-50 border-slate-100'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                }
      `}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        markTask(todo.id, !todo.is_completed);
                    }}
                    className={`
            shrink-0 transition-colors duration-200 focus:outline-none
            ${todo.is_completed ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-400'}
          `}
                >
                    {todo.is_completed ? (
                        <CircleCheckBig className="w-6 h-6 cursor-pointer" />
                    ) : (
                        <Circle className="w-6 h-6 cursor-pointer" />
                    )}
                </button>

                <div className="flex flex-col gap-1 min-w-0 flex-1 group/text">
                    <span
                        className={`
              font-medium text-sm sm:text-base truncate transition-all duration-200 select-none cursor-pointer
              ${todo.is_completed ? 'text-slate-400 line-through' : 'text-slate-700 group-hover/text:text-emerald-600'}
            `}
                        onClick={() => getSelectedTask(todo.id)}
                    >
                        {todo.title}
                    </span>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">

                        {/* Priority Indicator */}
                        {todo.priority && (
                            <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(todo.priority)}`} />
                                {todo.priority == '2' ? (
                                    <>
                                        <span className="sm:inline hidden">Medium</span>
                                        <span className="sm:hidden inline">Mid</span>
                                    </>
                                ) : (
                                    <span className="capitalize">{getPriorityLabel(todo.priority)}</span>
                                )}
                            </div>
                        )}

                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>

                        {/* Date & Time Metadata */}
                        <div className="flex items-center gap-1 text-slate-400">
                            <span className="md:hidden">
                                {todo.is_completed ? 'Done' : 'Added'} {formatJustDate(todo.is_completed ? todo.completed_on : todo.created_at)}
                            </span>
                            <span className="hidden md:inline">
                                {todo.is_completed ? 'Done' : 'Added'} {formatDate(todo.is_completed ? todo.completed_on : todo.created_at)}
                            </span>
                        </div>

                        {/* Procrastination Indicator */}
                        {todo.postpone_count > 0 && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <div className={`flex items-center gap-1 ${todo.postpone_count > 3 ? 'text-red-600' : 'text-amber-600'}`}>
                                    {/* Mobile View: Icon + Count */}
                                    <span className="flex items-center gap-1 md:hidden">
                                        <RotateCcw className="w-3 h-3" />
                                        {todo.postpone_count}x
                                    </span>
                                    {/* Desktop View: Full Text */}
                                    <span className="hidden md:inline">
                                        Postponed {todo.postpone_count}x
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    const taskDate = new Date(todo.scheduled_for).toDateString();
                    const today = new Date().toDateString();
                    const isToday = taskDate === today;
                    rescheduleTaskDay(todo.id, isToday ? 1 : 0);
                }}
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg focus:opacity-100 focus:outline-none ml-2"
                aria-label="Reschedule task"
            >
                <RotateCcw className="w-5 h-5 cursor-pointer" />
            </button>
            <button
                onClick={() => deleteTask(todo.id)}
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg focus:opacity-100 focus:outline-none ml-2"
                aria-label="Delete task"
            >
                <Trash2 className="w-5 h-5 cursor-pointer" />
            </button>
        </div>
    );
};

export default TodoItem;
