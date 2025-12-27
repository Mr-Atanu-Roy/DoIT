import { useState, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import TaskDetailsPanel from '../components/todo/TaskDetailsPanel';
import AddTaskInput from '../components/todo/AddTaskInput';
import FilterBar from '../components/todo/FilterBar';
import SubHeader from '../components/todo/SubHeader';
import { useTasks } from '../hooks/useTasks';
import Loading from '../components/ui/Loading';
import { usePageTitle } from '../hooks/usePageTitle';

const Today = () => {
    usePageTitle("Today");
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

    // State to trigger stats refresh in SubHeader
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const triggerRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    // Wrappers to update stats when tasks change
    const handleAddTask = async (task) => {
        const success = await addTask(task);
        if (success) {
            triggerRefresh();
        }
        return success;
    };

    const handleUpdateTask = async (id, updates) => {
        const res = await updateTask(id, updates);
        triggerRefresh();
        return res;
    };

    const handleMarkTask = async (id, isCompleted) => {
        await markTask(id, isCompleted);
        triggerRefresh();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        triggerRefresh();
    };

    const handleReschedule = async (id, newDayOffset) => {
        await rescheduleTaskDay(id, newDayOffset);
        triggerRefresh();
    };


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
                    <SubHeader dayOffset={day} refreshTrigger={refreshTrigger} />

                    {/* Header & Filters */}
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        day={day}
                        setDay={setDay}
                        showPriority={true}
                        showStatus={true}
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
                                day={day}
                                hasMore={hasMore}
                                fetchMoreTasks={fetchMoreTasks}
                                markTask={handleMarkTask}
                                deleteTask={handleDeleteTask}
                                rescheduleTaskDay={handleReschedule}
                                getSelectedTask={getSelectedTask}
                            />
                        )}

                        {/* Task Details Panel */}
                        <TaskDetailsPanel
                            selectedTask={selectedTask}
                            isOpen={!!selectedTask.id}
                            onClose={setSelectedTask}
                            updateTask={handleUpdateTask}
                            isLoading={selectedTaskLoading}
                        />
                    </div>

                    {/* Sticky Add Task Section */}
                    <AddTaskInput addTask={handleAddTask} />
                </main>
            </div>
        </div>
    );
};

export default Today;
