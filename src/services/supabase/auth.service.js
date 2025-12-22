
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
    },

    /**
     * Resend verification email
     * @param {string} email
     * @returns {Promise<{data, error}>}
     */
    async resendVerificationEmail(email) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.resend({
            type: 'signup',
            email,
        });
    },

    /**
     * Check if user email is verified
     * @param {object} user
     * @returns {boolean}
     */
    isEmailVerified(user) {
        return !!user?.email_confirmed_at;
    },

    /**
     * Send password reset email
     * @param {string} email
     * @returns {Promise<{data, error}>}
     */
    async sendPasswordResetEmail(email) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
    },

    /**
     * Send passwordless login link: magic link
     * @param {string} email
     * @returns {Promise<{data, error}>}
     */
    async sendPasswordlessLoginLink(email) {
        if (!supabase) return { error: { message: "Supabase not initialized" } };

        return await supabase.auth.signInWithOtp({
            email
        })

    },


};
