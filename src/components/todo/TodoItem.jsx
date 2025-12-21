import { Trash2, CheckCircle2, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    // Format timestamp helper
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Priority color helper
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-rose-500';
            case 'medium': return 'bg-amber-500';
            case 'low': return 'bg-emerald-500';
            default: return 'bg-slate-400';
        }
    };

    return (
        <div
            className={`
        group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200
        ${todo.completed
                    ? 'bg-emerald-50 border-slate-100'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                }
      `}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`
            shrink-0 transition-colors duration-200 focus:outline-none
            ${todo.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-400'}
          `}
                >
                    {todo.completed ? (
                        <CheckCircle2 className="w-6 h-6 cursor-pointer" />
                    ) : (
                        <Circle className="w-6 h-6 cursor-pointer" />
                    )}
                </button>

                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span
                        className={`
              font-medium text-sm sm:text-base truncate transition-all duration-200 select-none cursor-pointer
              ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}
            `}
                        onClick={() => onToggle(todo.id)}
                    >
                        {todo.text}
                    </span>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                        {/* Active Task Metadata */}
                        {!todo.completed && (
                            <>
                                {/* Priority Indicator */}
                                {todo.priority && (
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(todo.priority)}`} />
                                        <span className="capitalize">{todo.priority}</span>
                                    </div>
                                )}

                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            </>
                        )}

                        {/* Common Metadata: Created At */}
                        <span>Created {formatDate(todo.createdAt || Date.now())}</span>

                        {/* Completed Task Metadata */}
                        {todo.completed && todo.completedOn && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-emerald-600 font-medium">
                                    Completed {formatDate(todo.completedOn)}
                                </span>
                            </>
                        )}

                        {/* Procrastination Indicator */}
                        {todo.postponeCount > 0 && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-amber-600">
                                    Postponed {todo.postponeCount}x
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg focus:opacity-100 focus:outline-none ml-2"
                aria-label="Delete task"
            >
                <Trash2 className="w-5 h-5 cursor-pointer" />
            </button>
        </div>
    );
};

export default TodoItem;
