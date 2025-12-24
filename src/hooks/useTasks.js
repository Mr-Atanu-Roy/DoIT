import { useEffect, useState, useCallback } from "react";
import { taskService } from "../services/supabase/tasks.service";
import { validateTasks } from "../utils/tasks.validators";
import toast from "react-hot-toast";

// !Default pagination size
const PAGE_SIZE = 10;


export const useTasks = (day = 0) => {
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
        status: "active",   // all | active | completed
        priority: "all",    // all | 1 | 2 | 3
        search: "",         // title search
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
            toast.error(err.message || "Failed to load task details");
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
                    filters.status === "all"
                        ? null
                        : filters.status === "completed",
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
            toast.error(err.message || "Failed to load tasks");
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
    // MUTATIONS
    // --------------------
    const addTask = async (payload) => {

        //title required
        const titleCheck = validateTasks.title(payload.title);
        if (!titleCheck.status) {
            toast.error(titleCheck.message);
            return;
        }

        //priority required
        const priorityCheck = validateTasks.priority(payload.priority);
        if (!priorityCheck.status) {
            toast.error(priorityCheck.message);
            return;
        }

        //validate description if given
        if (payload.description) {
            const descriptionCheck = validateTasks.description(payload.description);
            if (!descriptionCheck.status) {
                toast.error(descriptionCheck.message);
                return;
            }
        }

        try {
            const { data, error } = await taskService.createTask(payload);
            if (error) throw error;

            setTasks(prev => [data[0], ...prev]);
            toast.success("Task added");
        } catch (err) {
            toast.error(err.message || "Failed to add task");
        }
    };

    const markTask = async (taskId, isCompleted) => {
        try {
            const { data, error } = await taskService.markTask(taskId, isCompleted);
            if (error) throw error;

            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? data[0] : task
                )
            );
        } catch (err) {
            toast.error("Failed to update task");
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
            toast.error("Failed to delete task");
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

            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? data[0] : task
                )
            );

            setSelectedTask(prev =>
                prev.id === taskId ? data[0] : prev
            );

            toast.success("Task updated");
        } catch (err) {
            toast.error(err.message || "Failed to update task");
        }
    };

    const rescheduleTaskDay = async (taskId, dayOffset = 1) => {
        try {
            const { data, error } = await taskService.moveTaskDay(taskId, dayOffset);
            if (error) throw error;

            // Task no longer belongs to this day: Remove from list
            setTasks(prev => prev.filter(task => task.id !== taskId));

            toast.success(`Task rescheduled ${dayOffset === 1 ? "to tomorrow" : (dayOffset == -1 ? "to yesterday" : "")}`);
        } catch (err) {
            toast.error(err.message || "Failed to reschedule task");
        }
    };

    // --------------------
    // EFFECT
    // --------------------
    useEffect(() => {
        fetchInitialTasks();
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
        setSelectedTask, // Exposed for clearing selection as per user request
    };
};

