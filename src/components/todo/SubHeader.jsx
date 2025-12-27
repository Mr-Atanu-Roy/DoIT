import { useAuth } from "../../hooks/useAuth";
import { useTaskStats } from "../../hooks/useTaskStats";
import { useMemo } from "react";

const SubHeader = ({ dayOffset = 0, refreshTrigger }) => {
    const { user } = useAuth();
    const { stats, loading } = useTaskStats(dayOffset, refreshTrigger);

    const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || "there";

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const { total, completed, active } = stats;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    const summaryText = useMemo(() => {

        //for tomorrow
        if (dayOffset === 1) {

            //check if user has any tasks scheduled for tomorrow
            if (total === 0) return "You have not scheduled any tasks for tomorrow.";

            //otherwise
            if (active === 1) return "You have scheduled 1 task for tomorrow.";
            return `You have scheduled ${active} tasks for tomorrow.`;
        }

        // Default to today
        // check if user has any tasks scheduled for today
        if (total === 0) return "You have not scheduled any tasks for today.";

        //otherwise
        if (active === 0) return "You have completed all tasks for today.";
        if (active === 1) return "You have 1 more task to complete for today.";
        return `You have ${active} more tasks to complete for today.`;
    }, [dayOffset, active]);

    if (loading) {
        return (
            <div className="mb-8 animate-pulse">
                <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-200 w-1/3"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between sm:gap-3">
            <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 capitalize">
                    {greeting}
                </h3>
                <h3 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent mb-1 capitalize">
                    {userName}
                </h3>
                <div className="flex items-center justify-between text-slate-500 text-sm mb-4">
                    <span>{summaryText}</span>
                </div>
            </div>

            {/* Progress Tile */}
            {total > 0 && dayOffset === 0 && (
                <div className="p-6  rounded-3xl bg-emerald-500 shadow-xl shadow-emerald-200/50 w-full sm:w-[360px] text-white relative overflow-hidden">
                    <div className="text-emerald-100 text-sm font-medium mb-4">Daily Progress</div>

                    <div className="flex items-end justify-between mb-4">
                        <div className="text-3xl font-bold tracking-tight">
                            {completed}/{total} <span className="text-lg font-semibold opacity-90">Completed</span>
                        </div>
                        <div className="text-3xl font-bold tracking-tight">{progress.toFixed(0)}%</div>
                    </div>

                    <div className="h-3 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubHeader;
