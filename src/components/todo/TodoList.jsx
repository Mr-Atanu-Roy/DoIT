import TodoItem from './TodoItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../ui/Loading';
import NothingYet from '../ui/NothingYet';

const TodoList = ({
    tasks,
    hasMore,
    day,
    fetchMoreTasks,
    markTask,
    deleteTask,
    rescheduleTaskDay,
    getSelectedTask,
}) => {

    if (!tasks || tasks.length === 0) {
        return (
            <NothingYet title="No tasks yet" message="We have nothing here to show you." />
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
                    day={day}
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
