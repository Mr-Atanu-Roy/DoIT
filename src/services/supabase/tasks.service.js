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
    * Get all tasks for a user scheduled for today/tomorrow
    * @param {int} dayOffset: 0: today, 1: tomorrow
    * @returns {Promise<{data, error}>}
    */
    async getAllTasks(dayOffset = 0, from, to) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .select('*')
            .eq(
                'scheduled_for', getDateTimeString(dayOffset)
            )
            .order('created_at', { ascending: false })
            .range(from, to);
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

        return await supabase
            .from('tasks')
            .update({
                scheduled_for: getDateTimeString(dayOffset)
            })
            .eq('id', taskId)
            .select()

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
        from,
        to
    }) {
        if (!supabase) {
            return { error: { message: "Supabase not initialized" } };
        }

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

        // pagination
        query = query.range(from, to);

        return await query;
    }

}