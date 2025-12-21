import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [todos, setTodos] = useState([
        { id: 1, text: "Review project requirements", completed: false },
        { id: 2, text: "Design system architecture", completed: true },
        { id: 3, text: "Setup development environment", completed: true },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: newTask,
            completed: false
        };

        setTodos([newTodo, ...todos]);
        setNewTask("");
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen transition-all duration-300">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
                    {/* Add Task Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Today's Tasks</h2>
                    </div>

                    {/* Task List */}
                    <div className="pb-24">
                        <TodoList
                            todos={todos}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    </div>

                    {/* Sticky Add Task Section */}
                    <div className="sticky bottom-6 mt-auto">
                        <form onSubmit={addTodo} className="relative group shadow-2xl rounded-2xl">
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                className="w-full pl-6 pr-20 py-4 rounded-2xl bg-white border-2 border-slate-200 shadow-lg focus:shadow-xl focus:border-emerald-500 outline-none transition-all duration-300 text-lg placeholder:text-slate-400"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <div className="absolute right-2 top-2 bottom-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="h-full w-14 rounded-xl p-0 flex items-center justify-center shadow-md hover:shadow-lg"
                                    disabled={!newTask.trim()}
                                >
                                    <Plus className="w-6 h-6" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
