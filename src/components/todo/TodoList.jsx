import TodoItem from './TodoItem';
import { PackageOpen } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onSelect }) => {
    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-bounce-in">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <PackageOpen className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-600 font-medium text-lg">No tasks yet</h3>
                <p className="text-slate-400 text-sm max-w-xs mt-1">
                    Add a task above to get started with your day.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default TodoList;
