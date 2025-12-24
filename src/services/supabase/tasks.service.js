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
    async createTask({ title, description, priority, scheduled_for }) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .insert([
                {
                    title,
                    description,
                    priority,
                    scheduled_for
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
    async moveTaskToNextDay(taskId, dayOffset = 1) {
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
    * Filter task by priority
    * @param {int} priority: 1, 2, 3
    * @returns {Promise<{data, error}>}
    */

    async filterTasksByPriority(priority, from, to) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .select('*')
            .eq('priority', priority)
            .order('created_at', { ascending: false })
            .range(from, to);
    },

    /**
    * Filter task by completed status
    * @param {boolean} is_completed
    * @returns {Promise<{data, error}>}
    */
    async filterTasksByCompleted(is_completed, from, to) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .select('*')
            .eq('is_completed', is_completed)
            .order('created_at', { ascending: false })
            .range(from, to);
    },


    /**
    * Filter task by title (case insenitive): used for search
    * @param {string} query
    * @returns {Promise<{data, error}>}
    */
    async filterTaskByTitle(query, from, to) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase
            .from('tasks')
            .select('*')
            .ilike('title', `%${query}%`)
            .order('created_at', { ascending: false })
            .range(from, to);
    },


}