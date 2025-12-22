import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import TaskDetailsPanel from '../components/todo/TaskDetailsPanel';
import AddTaskInput from '../components/todo/AddTaskInput';
import { ChevronDown, CalendarClock } from 'lucide-react';

const Today = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Updated initial state with new properties
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Review project requirements",
            completed: false,
            priority: 'high',
            createdAt: Date.now() - 86400000,
            postponeCount: 0,
            scheduledFor: 'today'
        },
        {
            id: 2,
            text: "Design system architecture",
            completed: true,
            completedOn: Date.now() - 4000000,
            priority: 'medium',
            createdAt: Date.now() - 172800000,
            postponeCount: 1,
            scheduledFor: 'today'
        },
        {
            id: 3,
            text: "Setup development environment",
            completed: true,
            completedOn: Date.now() - 2000000,
            priority: 'low',
            createdAt: Date.now() - 259200000,
            postponeCount: 0,
            scheduledFor: 'today'
        },
    ]);

    // Task Input State has been moved to AddTaskInput component

    // Filter State
    const [filterStatus, setFilterStatus] = useState("active"); // 'all', 'active', 'completed'
    const [filterPriority, setFilterPriority] = useState("all"); // 'all', 'high', 'medium', 'low'
    const [isTodayFilterActive, setIsTodayFilterActive] = useState(true);

    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleUpdateTodo = (updatedTodo) => {
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    };

    const addTodo = ({ text, priority, scheduledFor }) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            createdAt: Date.now(),
            postponeCount: 0,
            scheduledFor: scheduledFor
        };

        setTodos([newTodo, ...todos]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addTodo();
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                const isNowCompleted = !todo.completed;
                return {
                    ...todo,
                    completed: isNowCompleted,
                    completedOn: isNowCompleted ? Date.now() : undefined
                };
            }
            return todo;
        }));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Filter Logic
    const filteredTodos = todos.filter(todo => {
        // Status Filter
        if (filterStatus === 'active' && todo.completed) return false;
        if (filterStatus === 'completed' && !todo.completed) return false;

        // Priority Filter
        if (filterPriority !== 'all' && todo.priority !== filterPriority) return false;

        // Date Filter (Today vs Tomorrow)
        const expectedSchedule = isTodayFilterActive ? 'today' : 'tomorrow';
        if (todo.scheduledFor !== expectedSchedule) return false;

        return true;
    });

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen transition-all duration-300">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full relative">
                    {/* Header & Filters */}
                    <div className="mb-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {isTodayFilterActive ? "Today's Tasks" : "Tomorrow's Tasks"}
                            </h2>
                            <div className="text-slate-500 text-sm font-medium">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3 items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Status Filter */}
                                <div className="relative group">
                                    <select
                                        className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:border-emerald-300"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
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
                                        value={filterPriority}
                                        onChange={(e) => setFilterPriority(e.target.value)}
                                    >
                                        <option value="all">Any Priority</option>
                                        <option value="high">High Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="low">Low Priority</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            {/* Date Filter Toggle */}
                            <button
                                onClick={() => setIsTodayFilterActive(!isTodayFilterActive)}
                                className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border cursor-pointer select-none
                                    ${isTodayFilterActive
                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <CalendarClock className={`w-4 h-4 ${isTodayFilterActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                                Today's Tasks
                            </button>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="pb-32">
                        <TodoList
                            todos={filteredTodos}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onSelect={setSelectedTodo}
                        />

                        {/* Task Details Panel */}
                        <TaskDetailsPanel
                            todo={selectedTodo}
                            isOpen={!!selectedTodo}
                            onClose={() => setSelectedTodo(null)}
                            onSave={handleUpdateTodo}
                        />
                    </div>

                    {/* Sticky Add Task Section */}
                    <AddTaskInput onAddTask={addTodo} />
                </main>
            </div>
        </div>
    );
};

export default Today;
