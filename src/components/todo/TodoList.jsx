import TodoItem from './TodoItem';
import { PackageOpen } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../ui/Loading';

const TodoList = ({
    tasks,
    hasMore,
    fetchMoreTasks,
    markTask,
    deleteTask,
    rescheduleTaskDay,
    getSelectedTask
}) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-bounce-in">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <PackageOpen className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-600 font-medium text-lg">No tasks yet</h3>
                <p className="text-slate-400 text-sm max-w-xs mt-1">
                    You have not added any tasks yet for here.
                </p>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={tasks.length}
            next={fetchMoreTasks}
            hasMore={hasMore}
            loader={<Loading text="Loading..." />}
            className="space-y-1 pb-32"
            style={{ overflow: 'visible' }}
        >
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    todo={task}
                    markTask={markTask}
                    deleteTask={deleteTask}
                    rescheduleTaskDay={rescheduleTaskDay}
                    getSelectedTask={getSelectedTask}
                />
            ))}
        </InfiniteScroll>
    );
};

export default TodoList;
