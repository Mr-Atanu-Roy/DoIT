import { useEffect, useState, useCallback } from "react";
import { taskService } from "../services/supabase/tasks.service";
import { validateTasks } from "../utils/tasks.validators";
import { getDateTimeString, isOverdue } from "../utils/utils";
import toast from "react-hot-toast";

// !Default pagination size
const PAGE_SIZE = 10;




// !Hook for interacting with tasks.

export const useTasks = (day = 0, defaultStatus = 'incompleted', defaultOverdue = 'all') => {
    // --------------------
    // STATE
    // --------------------

    //for storing tasks, selected task, pagination, loading states
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    //for storing page, check if has more tasks
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    //for task loading, selected task loading
    const [loading, setLoading] = useState(false);
    const [selectedTaskLoading, setSelectedTaskLoading] = useState(false);

    //for task filters
    const [filters, setFilters] = useState({
        status: defaultStatus,   // all | incompleted | completed
        priority: "all",    // all | 1 | 2 | 3
        search: "",         // title search
        overdue: defaultOverdue, // all | overdue | completed
    });

    // --------------------
    // CORE FETCH
    // --------------------


    const getSelectedTask = async (taskId) => {
        if (!taskId) return;

        try {
            setSelectedTaskLoading(true);

            const { data, error } = await taskService.getTask(taskId);
            if (error) throw error;

            setSelectedTask(data[0] || {});
        } catch (err) {
            toast.error("Failed to load task details err:1");
        } finally {
            setSelectedTaskLoading(false);
        }
    };

    const fetchTasks = useCallback(async (pageIndex = 0, append = false) => {
        try {
            setLoading(true);

            const from = pageIndex * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            const { data, error } = await taskService.getFilteredTasks({
                priority:
                    filters.priority !== "all"
                        ? Number(filters.priority)
                        : null,
                is_completed:
                    filters.status !== 'all' // If status filter is active (not all)
                        ? filters.status === 'completed'
                        : filters.overdue === 'completed' // If overdue filter is 'completed'
                            ? true
                            : filters.overdue === 'overdue' // If overdue filter is 'overdue'
                                ? false
                                : null, // 'all' or undefined

                is_overdue: filters.overdue === 'overdue' ? true : null,

                title: filters.search || null,
                dayOffset: day,
                from,
                to,
            });

            if (error) throw error;

            setTasks(prev =>
                append ? [...prev, ...(data || [])] : (data || [])
            );

            setHasMore((data || []).length === PAGE_SIZE);
            setPage(pageIndex);
        } catch (err) {
            toast.error("Failed to load tasks err:2");
        } finally {
            setLoading(false);
        }
    }, [day, filters]);

    // --------------------
    // PUBLIC FETCH METHODS
    // --------------------
    const fetchInitialTasks = useCallback(() => {
        setHasMore(true);
        fetchTasks(0, false);
    }, [fetchTasks]);

    const fetchMoreTasks = () => {
        if (loading || !hasMore) return;
        fetchTasks(page + 1, true);
    };

    // --------------------
    // HELPERS
    // --------------------
    const isTaskVisible = useCallback((task) => {
        // 1. Check Day Filter
        // If day is set (not null/ALL), task must belong to that day
        if (day !== null && day !== 'ALL') {
            const dateStr = getDateTimeString(day);
            if (task.scheduled_for !== dateStr) return false;
        }

        // 2. Check Status Filter
        if (filters.status === 'incompleted' && task.is_completed) return false;
        if (filters.status === 'completed' && !task.is_completed) return false;

        // 3. Check Overdue Filter
        if (filters.overdue === 'overdue') {
            // Task must be overdue and NOT completed
            if (!isOverdue(task.scheduled_for)) return false;
            if (task.is_completed) return false;
        } else if (filters.overdue === 'completed') {
            // If we are strictly looking for completed overdue tasks via filter
            if (!task.is_completed) return false;
        }

        // 4. Check Priority Filter
        if (filters.priority !== 'all' && Number(filters.priority) !== task.priority) return false;

        // 5. Check Search Filter
        if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;

        return true;
    }, [day, filters]);

    // --------------------
    // MUTATIONS
    // --------------------
    const addTask = async (payload) => {

        //title required
        const titleCheck = validateTasks.title(payload.title);
        if (!titleCheck.status) {
            toast.error(titleCheck.message);
            return false;
        }

        //priority required
        const priorityCheck = validateTasks.priority(payload.priority);
        if (!priorityCheck.status) {
            toast.error(priorityCheck.message);
            return false;
        }

        //validate description if given
        if (payload.description) {
            const descriptionCheck = validateTasks.description(payload.description);
            if (!descriptionCheck.status) {
                toast.error(descriptionCheck.message);
                return false;
            }
        }

        try {
            const { data, error } = await taskService.createTask(payload);
            if (error) throw error;

            const newTask = data[0];

            // Only add to list if it matches current filters
            if (isTaskVisible(newTask)) {
                setTasks(prev => [newTask, ...prev]);
            }

            //show toast msg: eg- task added for today
            toast.success(`Task added for ${payload.dayOffset == 0 ? "Today" : "Tomorrow"}`);
            return true;
        } catch (err) {
            toast.error("Failed to add task err:3");
            return false;
        }
    };

    const markTask = async (taskId, isCompleted) => {
        try {
            const { data, error } = await taskService.markTask(taskId, isCompleted);
            if (error) throw error;

            const updatedTask = data[0];

            setTasks(prev => {
                // If task no longer fits filters, remove it
                if (!isTaskVisible(updatedTask)) {
                    return prev.filter(t => t.id !== taskId);
                }
                // Otherwise update it in place
                return prev.map(task =>
                    task.id === taskId ? updatedTask : task
                );
            });

            toast.success(`Task marked ${isCompleted ? "completed" : "incompleted"} `);
        } catch (err) {
            toast.error("Failed to update task err:4");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const { error } = await taskService.deleteTask(taskId);
            if (error) throw error;

            setTasks(prev => prev.filter(t => t.id !== taskId));

            //reset selected task if it was deleted
            if (selectedTask.id === taskId) {
                setSelectedTask({});
            }

            toast.success("Task deleted");
        } catch (err) {
            toast.error("Failed to delete task err:5");
        }
    };

    const updateTask = async (taskId, updates) => {
        // Update can be partial/full

        if (updates.title !== undefined) {
            const checkTitle = validateTasks.title(updates.title);
            if (!checkTitle.status) {
                toast.error(checkTitle.message);
                return;
            }
        }

        if (updates.description !== undefined) {
            const checkDesc = validateTasks.description(updates.description);
            if (!checkDesc.status) {
                toast.error(checkDesc.message);
                return;
            }
        }

        if (updates.priority !== undefined) {
            const checkPriority = validateTasks.priority(updates.priority);
            if (!checkPriority.status) {
                toast.error(checkPriority.message);
                return;
            }
        }


        if (updates.scheduled_for !== undefined) {
            const checkScheduledFor = validateTasks.scheduled_for(updates.scheduled_for);
            if (!checkScheduledFor.status) {
                toast.error(checkScheduledFor.message);
                return;
            }
        }

        try {
            const { data, error } = await taskService.updateTask(taskId, updates);
            if (error) throw error;

            const updatedTask = data[0];

            setTasks(prev => {
                // If task no longer fits filters, remove it
                if (!isTaskVisible(updatedTask)) {
                    return prev.filter(t => t.id !== taskId);
                }
                return prev.map(task =>
                    task.id === taskId ? updatedTask : task
                );
            });

            setSelectedTask(prev =>
                prev.id === taskId ? updatedTask : prev
            );

            toast.success("Task updated");
        } catch (err) {
            toast.error("Failed to update task err:6");
        }
    };

    const rescheduleTaskDay = async (taskId, dayOffset = 1) => {
        try {
            const { data, error } = await taskService.moveTaskDay(taskId, dayOffset);
            if (error) throw error;

            // Remove from list logic handles it if day changed
            // we can check isTaskVisible with the NEW date if we had the full task object.
            if (data && data[0]) {
                const updatedTask = data[0];
                setTasks(prev => {
                    if (!isTaskVisible(updatedTask)) {
                        return prev.filter(t => t.id !== taskId);
                    }
                    return prev.map(t => t.id === taskId ? updatedTask : t);
                });
            } else {
                // Fallback if data not returned, just remove as before (safest assumption for reschedule)
                setTasks(prev => prev.filter(task => task.id !== taskId));
            }

            toast.success(`Task rescheduled for ${dayOffset === 1 ? "tomorrow" : "today"}`);
        } catch (err) {
            console.log(err);
            toast.error("Failed to reschedule task err:7");
        }
    };

    // --------------------
    // EFFECT
    // --------------------
    useEffect(() => {
        if (day !== 'ALL') {
            fetchInitialTasks();
        }
    }, [day, filters, fetchInitialTasks]);

    // --------------------
    // API
    // --------------------
    return {
        tasks,
        selectedTask,

        loading,
        selectedTaskLoading,
        hasMore,
        page, // Export page state
        filters,
        setFilters,

        getSelectedTask,
        fetchMoreTasks,
        addTask,
        updateTask,
        markTask,
        deleteTask,
        rescheduleTaskDay,
        getSelectedTask,
        setSelectedTask,

    };
};
