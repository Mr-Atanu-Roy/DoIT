import { Trash2, CheckCircle2, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div
            className={`
        group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200
        ${todo.completed
                    ? 'bg-slate-50 border-slate-100'
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
                        <CheckCircle2 className="w-6 h-6" />
                    ) : (
                        <Circle className="w-6 h-6" />
                    )}
                </button>
                <span
                    className={`
            font-medium text-sm sm:text-base truncate transition-all duration-200 select-none cursor-pointer
            ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}
          `}
                    onClick={() => onToggle(todo.id)}
                >
                    {todo.text}
                </span>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg focus:opacity-100 focus:outline-none"
                aria-label="Delete task"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default TodoItem;
