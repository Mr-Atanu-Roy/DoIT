
import { supabase } from './client';

export const authService = {
    /**
     * Register a new user
     * @param {string} email
     * @param {string} password
     * @param {string} fullName
     * @returns {Promise<{data, error}>}
     */
    async register(email, password, fullName) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName, // This adds it to metadata
                    // You can add other fields here (e.g., avatar_url: '...')
                }
            }
        });
    },

    /**
     * Log in an existing user
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{data, error}>}
     */
    async logIn(email, password) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    },

    /**
     * Log out the current user
     * @returns {Promise<{error}>}
     */
    async logOut() {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.signOut();
    },

    /**
     * Get the current active session
     * @returns {Promise<{data: {session}, error}>}
     */
    async getCurrentSession() {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.getSession();
    },

    /**
     * Subscribe to auth state changes
     * @param {function} callback
     * @returns {{data: {subscription}}}
     */
    onAuthStateChange(callback) {
        if (!supabase) return { data: { subscription: { unsubscribe: () => { } } } };

        return supabase.auth.onAuthStateChange(callback);
    }
};
