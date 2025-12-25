import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/supabase/tasks.service';
import toast from 'react-hot-toast';

export const useTaskStats = (dayOffset = 0, refreshTrigger = 0) => {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        active: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            // slightly delay 
            // setStatsLoading(true); // Maybe not needed to flicker loading state on refresh if we want subtle updates

            const { data, error } = await taskService.getTaskStatsByDay(dayOffset);
            if (error) throw error;

            setStats(data);
        } catch (err) {
            console.error(err);
            // toast.error("Failed to load stats"); // Suppress error for header stats to avoid noise? Or keep it? Plan says "Handle loading state gracefully", implies UI.
        } finally {
            setLoading(false);
        }
    }, [dayOffset, refreshTrigger]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        stats,
        loading,
        refreshStats: fetchStats
    };
};
