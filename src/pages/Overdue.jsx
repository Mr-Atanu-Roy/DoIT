import { useState, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TodoList from '../components/todo/TodoList';
import TaskDetailsPanel from '../components/todo/TaskDetailsPanel';
import AddTaskInput from '../components/todo/AddTaskInput';
import FilterBar from '../components/todo/FilterBar';
import { useTasks } from '../hooks/useTasks';
import Loading from '../components/ui/Loading';
import { usePageTitle } from '../hooks/usePageTitle';

const Overdue = () => {
    usePageTitle("Overdue Tasks");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Initialize useTasks with null (all days)
    const {
        tasks,
        selectedTask,
        loading,
        selectedTaskLoading,
        hasMore,
        filters,
        setFilters,
        getSelectedTask,
        addTask,
        updateTask,
        markTask,
        deleteTask,
        rescheduleTaskDay,
        setSelectedTask,
        fetchMoreTasks
    } = useTasks(null, 'all', 'overdue');

    // Handle search from Header
    const handleSearch = useCallback((query) => {
        setFilters(prev => ({ ...prev, search: query }));
    }, [setFilters]);

    // Handle fetching more tasks (infinite scroll)
    const handleFetchMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchMoreTasks();
        }
    }, [loading, hasMore, fetchMoreTasks]);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen transition-all duration-300">
                <Header
                    title="Overdue"
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onSearch={handleSearch}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full relative">
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        showOverdue={true}
                        title="Overdue Tasks"
                    />

                    {loading && tasks.length === 0 ? (
                        <div className="flex justify-center py-12">
                            <Loading />
                        </div>
                    ) : (
                        <TodoList
                            tasks={tasks}
                            markTask={markTask}
                            deleteTask={deleteTask}
                            rescheduleTaskDay={rescheduleTaskDay}
                            getSelectedTask={getSelectedTask}
                            loading={loading}
                            hasMore={hasMore}
                            fetchMoreTasks={handleFetchMore}
                        />
                    )}

                    <TaskDetailsPanel
                        selectedTask={selectedTask}
                        isOpen={!!selectedTask?.id}
                        onClose={() => setSelectedTask({})}
                        updateTask={updateTask}
                        loading={selectedTaskLoading}
                    />

                    <AddTaskInput addTask={addTask} />
                </main>
            </div>
        </div>
    );
};

export default Overdue;
