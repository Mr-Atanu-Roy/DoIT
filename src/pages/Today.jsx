import { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import TaskDetailsPanel from '../components/todo/TaskDetailsPanel';
import AddTaskInput from '../components/todo/AddTaskInput';
import FilterBar from '../components/todo/FilterBar';
import { useTasks } from '../hooks/useTasks';
import Loading from '../components/ui/Loading';

const Today = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Manage day state here to pass to hook
    const [day, setDay] = useState(0);

    const {
        tasks,
        selectedTask,
        loading,
        selectedTaskLoading,
        hasMore,
        filters,
        setFilters,
        getSelectedTask,
        rescheduleTaskDay,
        setSelectedTask,
        fetchMoreTasks,
        addTask,
        updateTask,
        markTask,
        deleteTask,
    } = useTasks(day);

    const handleSearch = useCallback((query) => {
        setFilters(prev => ({ ...prev, search: query }));
    }, [setFilters]);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen transition-all duration-300">
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onSearch={handleSearch}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full relative">
                    {/* Header & Filters */}
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        day={day}
                        setDay={setDay}
                    />

                    {/* Task List */}
                    <div className="pb-32">
                        {loading && tasks.length === 0 ? (
                            <div className="flex justify-center py-10">
                                <Loading text="Loading tasks..." />
                            </div>
                        ) : (
                            <TodoList
                                tasks={tasks}
                                hasMore={hasMore}
                                fetchMoreTasks={fetchMoreTasks}
                                markTask={markTask}
                                deleteTask={deleteTask}
                                rescheduleTaskDay={rescheduleTaskDay}
                                getSelectedTask={getSelectedTask}
                            />
                        )}

                        {/* Task Details Panel */}
                        <TaskDetailsPanel
                            selectedTask={selectedTask}
                            isOpen={!!selectedTask.id}
                            onClose={setSelectedTask}
                            updateTask={updateTask}
                            isLoading={selectedTaskLoading}
                        />
                    </div>

                    {/* Sticky Add Task Section */}
                    <AddTaskInput addTask={addTask} />
                </main>
            </div>
        </div>
    );
};

export default Today;
