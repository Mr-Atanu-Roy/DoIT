import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import Button from '../components/ui/Button';
import TaskDetailsPanel from '../components/todo/TaskDetailsPanel';
import { Plus, ChevronDown, Filter, CalendarClock } from 'lucide-react';

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

    const priority = [
        { id: 'high', label: 'High', color: 'bg-rose-500', hover: 'hover:bg-rose-50 text-rose-600' },
        { id: 'medium', label: 'Medium', color: 'bg-amber-500', hover: 'hover:bg-amber-50 text-amber-600' },
        { id: 'low', label: 'Low', color: 'bg-emerald-500', hover: 'hover:bg-emerald-50 text-emerald-600' }
    ];

    // Task Input State
    const [newTask, setNewTask] = useState("");
    const [newPriority, setNewPriority] = useState("medium");
    const [isScheduledForToday, setIsScheduledForToday] = useState(false);
    const [isInputExpanded, setIsInputExpanded] = useState(false);

    // Filter State
    const [filterStatus, setFilterStatus] = useState("active"); // 'all', 'active', 'completed'
    const [filterPriority, setFilterPriority] = useState("all"); // 'all', 'high', 'medium', 'low'
    const [isTodayFilterActive, setIsTodayFilterActive] = useState(true);

    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleUpdateTodo = (updatedTodo) => {
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    };

    const addTodo = (e) => {
        if (e) e.preventDefault();
        if (!newTask.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: newTask,
            completed: false,
            priority: newPriority,
            createdAt: Date.now(),
            postponeCount: 0,
            scheduledFor: isScheduledForToday ? 'today' : 'tomorrow'
        };

        setTodos([newTodo, ...todos]);
        setNewTask("");
        setNewPriority("medium");
        setIsScheduledForToday(false);
        // Keep expanded logic can stay as is
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
                            <h2 className="text-2xl font-bold text-slate-800">Today's Tasks</h2>
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
                                {isTodayFilterActive ? "Today's Tasks" : "Tomorrow's Tasks"}
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
                    <div className="fixed bottom-6 left-0 lg:left-64 right-0 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
                        <form
                            onSubmit={addTodo}
                            className={`
                                relative group shadow-2xl rounded-2xl bg-white border-2 border-slate-200 transition-all duration-300 overflow-hidden
                                ${isInputExpanded ? 'shadow-emerald-500/10 border-emerald-500/50' : ''}
                            `}
                            onFocus={() => setIsInputExpanded(true)}
                        // Click outside listener could be added here to collapse, but native focus blur might be enough if handled carefully
                        >
                            <div className="p-2">
                                <div className="relative">

                                    <input
                                        type="text"
                                        placeholder="Add a new task..."
                                        className="w-full pl-6 pr-20 py-4 rounded-2xl bg-white outline-none text-lg placeholder:text-slate-400"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />

                                    <div className="absolute right-1 top-1 bottom-1">
                                        {/* Add Button */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="h-12 w-12 rounded-xl p-0 flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer"
                                            disabled={!newTask.trim()}
                                        >
                                            <Plus className="w-8 h-8" />
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
                                                {priority.map((priority) => (
                                                    <button
                                                        key={priority.id}
                                                        type="button"
                                                        onClick={() => setNewPriority(priority.id)}
                                                        className={`
                                                            px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer
                                                            ${newPriority === priority.id
                                                                ? `bg-slate-800 text-white border-slate-800 shadow-sm`
                                                                : `bg-white border-slate-200 text-slate-500 hover:border-slate-300 ${priority.hover}`
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-1.5">
                                                            <div
                                                                className={`w-1.5 h-1.5 rounded-full ${newPriority === priority.id ? 'bg-white' : priority.color
                                                                    }`}
                                                            />
                                                            {priority.id === 'medium' ? (
                                                                <>
                                                                    <span className="sm:inline hidden">Medium</span>
                                                                    <span className="sm:hidden inline">Mid</span>
                                                                </>
                                                            ) : (
                                                                priority.label
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
                </main>
            </div>
        </div>
    );
};

export default Today;
