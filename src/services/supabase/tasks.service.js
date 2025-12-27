import { supabase } from './client';
import { getDateTimeString } from "../../utils/utils";


//!NOTE: by default all results are ordered by `created_at` in descending order (latest first)

export const taskService = {

    /**
    * Create a new task
    * @param {string} title
    * @param {string} description
    * @param {string} priority
    * @param {string} scheduled_for
    * @returns {Promise<{data, error}>}
    */
    async createTask({ title, description, priority, dayOffset = 1 }) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .insert([
                {
                    title,
                    description,
                    priority,
                    scheduled_for: getDateTimeString(dayOffset)
                },
            ])
            .select()
    },

    /**
    * Update a task row
    * @param {int} taskId: pk
    * @param {object} updates
    * @returns {Promise<{data, error}>}
    */
    async updateTask(taskId, updates) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };


        return await supabase
            .from('tasks')
            .update({ ...updates })
            .eq('id', taskId)
            .select()
    },


    /**
    * Delete a task row
    * @param {int} taskId: pk
    * @returns {Promise<{data, error}>}
    */
    async deleteTask(taskId) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)
            .select()
    },


    /**
    * Get a perticular tasks for a user
    * @param {int} taskId: pk
    * @returns {Promise<{data, error}>}
    */
    async getTask(taskId) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .select('*')
            .eq('id', taskId)
    },


    /**
    * Mark task complete/incomplete
    * @param {int} taskId: pk
    * @param {boolean} is_completed
    * @returns {Promise<{data, error}>}
    */
    async markTask(taskId, is_completed) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .update({
                is_completed: is_completed,
                completed_on: is_completed ? getDateTimeString(0, true) : null
            })
            .eq('id', taskId)
            .select()
    },


    /**
    * Move task to next day/prev day
    * @param {int} taskId: pk
    * @param {int} dayOffset: 1: next day, -1: prev day
    * @returns {Promise<{data, error}>}
    */
    async moveTaskDay(taskId, dayOffset = 1) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };
        if (dayOffset < 0) return { error: { message: "Day offset must be at least 0" } };

        return await supabase.rpc("move_task_day", {
            p_task_id: taskId,
            p_day_offset: dayOffset,
        });

    },

    /**
  * Get tasks with multiple filters
  * @param {object} filters
  * @returns {Promise<{data, error}>}
  */
    async getFilteredTasks({
        priority = null,
        is_completed = null,
        title = null,
        dayOffset = null,
        is_overdue = null,
        from,
        to
    }) {
        if (!supabase) {
            return { error: { message: "Supabase not initialized" } };
        }

        //get the tasks: then order by date
        let query = supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        // filter by priority (1, 2, 3)
        if (priority !== null) {
            query = query.eq('priority', priority);
        }

        // filter by completion status
        if (is_completed !== null) {
            query = query.eq('is_completed', is_completed);
        }

        // filter by scheduled date
        if (dayOffset !== null) {
            const scheduled_for = getDateTimeString(dayOffset);
            query = query.eq('scheduled_for', scheduled_for);
        }

        // filter by title (case-insensitive search)
        if (title !== null) {
            query = query.ilike('title', `%${title}%`);
        }

        // filter by overdue
        if (is_overdue !== null) {
            query = query.eq('is_completed', false);
            query = query.lt('scheduled_for', getDateTimeString(0));
        }

        // pagination
        query = query.range(from, to);

        return await query;
    },

    /**
    * Get task statistics for a specific day
    * @param {int} dayOffset: 0 for today, 1 for tomorrow
    * @returns {Promise<{data: {total: number, completed: number, active: number}, error}>}
    */
    async getTaskStatsByDay(dayOffset = 0) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        try {
            const date = getDateTimeString(dayOffset);

            const [totalResult, completedResult] = await Promise.all([
                // Get total count
                supabase
                    .from('tasks')
                    .select('*', { count: 'exact', head: true })
                    .eq('scheduled_for', date),

                // Get completed count
                supabase
                    .from('tasks')
                    .select('*', { count: 'exact', head: true })
                    .eq('scheduled_for', date)
                    .eq('is_completed', true)
            ]);


            if (totalResult.error) throw totalResult.error;
            if (completedResult.error) throw completedResult.error;

            const total = totalResult.count || 0;
            const completed = completedResult.count || 0;

            return {
                data: {
                    total,
                    completed,
                    active: total - completed
                }
            };

        } catch (error) {
            return { error };
        }
    },

    /**
    * Bulk move tasks to next day/prev day
    * @param {int[]} taskIds: array of task ids
    * @param {int} dayOffset: 1: next day, -1: prev day
    * @returns {Promise<{data, error}>}
    */
    async bulkMoveTasksDay(taskIds = [], dayOffset = 1) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };
        if (dayOffset < 0) return { error: { message: "Day offset must be at least 0" } };

        return await supabase.rpc('move_tasks_day_bulk', {
            p_task_ids: taskIds,
            p_day_offset: dayOffset
        });
    },

    /**
    * Get all active task IDs for a specific day: default today
    * @param {int} dayOffset
    * @returns {Promise<{data: int[], error}>}
    */
    async getActiveTaskIds(dayOffset = 0) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        const date = getDateTimeString(dayOffset);

        const { data, error } = await supabase
            .from('tasks')
            .select('id')
            .eq('scheduled_for', date)
            .eq('is_completed', false);

        if (error) return { error };

        return { data: data.map(t => t.id) };
    }

}