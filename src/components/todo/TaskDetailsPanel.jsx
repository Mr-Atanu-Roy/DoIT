import { useState, useEffect } from 'react';
import { X, Clock, RotateCcw, CircleCheckBig, CircleX } from 'lucide-react';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import { formatDate } from '../../utils/utils';

const TaskDetailsPanel = ({
    selectedTask,
    isOpen,
    onClose,
    updateTask,
    isLoading,
}) => {
    // Cache the task to display during exit animation
    const [cachedTask, setCachedTask] = useState(null);

    // Update cached task when selectedTask is available
    useEffect(() => {
        if (selectedTask && selectedTask.id) {
            setCachedTask(selectedTask);
        }
    }, [selectedTask]);
    // Local state for editing
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '2',
        scheduled_for: 'tomorrow', // This handles string 'today'/'tomorrow' in UI? Or date?
        is_completed: false,
        completed_on: null,
    });

    // Reset form when selectedTask or cachedTask changes
    useEffect(() => {
        const taskToUse = selectedTask && selectedTask.id ? selectedTask : cachedTask;

        if (taskToUse && taskToUse.id) {
            const date = new Date(taskToUse.scheduled_for);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const scheduledVal = date.toDateString() === today.toDateString() ? 'today' : 'tomorrow';

            setFormData({
                title: taskToUse.title || '',
                description: taskToUse.description || '',
                priority: String(taskToUse.priority || '2'),
                scheduled_for: scheduledVal,
                is_completed: taskToUse.is_completed || false,
                completed_on: taskToUse.completed_on || null,
            });
        }
    }, [selectedTask, cachedTask]);

    // Handle Closing
    const handleClose = () => {
        onClose({}); // Pass empty object to clear selection
    };

    // Handle Saving
    const handleSave = () => {
        const date = new Date();
        if (formData.scheduled_for === 'tomorrow') {
            date.setDate(date.getDate() + 1);
        }

        updateTask(cachedTask.id, {
            title: formData.title,
            description: formData.description,
            priority: Number(formData.priority),
            scheduled_for: date.toISOString(),
            is_completed: formData.is_completed
            // completed_on handled by backend: tasks.service
        });
        // handleClose();
    };

    // Only return null if we have never had a task (initial load)
    if (!cachedTask) return null;

    // Use cachedTask for display to ensure content persists during exit animation
    const displayTask = cachedTask;

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            />

            {/* Panel */}
            <div className={`
                absolute inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl flex flex-col h-full 
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Task Details</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                {/* main content  */}

                {
                    isLoading ? (
                        <div className="flex justify-center py-10 min-h-[calc(100vh-10rem)]">
                            <Loading text="Loading task details..." />
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* General Section */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Task Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                                    <textarea
                                        className="w-full h-32 rounded-lg border border-slate-200 p-3 text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                        placeholder="Add notes, context, or subtasks..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Properties Section */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
                                    <select
                                        className="cursor-pointer w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 focus:outline-none focus:border-emerald-500 bg-white"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    >
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled For</label>
                                    <select
                                        className="cursor-pointer w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 focus:outline-none focus:border-emerald-500 bg-white"
                                        value={formData.scheduled_for}
                                        onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
                                    >
                                        <option value="today">Today</option>
                                        <option value="tomorrow">Tomorrow</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-sm font-medium text-slate-700">Completion Status</span>
                                <button
                                    onClick={() => setFormData({ ...formData, is_completed: !formData.is_completed })}
                                    className={`
                                        cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                                        ${formData.is_completed ? 'bg-emerald-500' : 'bg-slate-300'}
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            ${formData.is_completed ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>

                            {/* Metadata Section (Read Only) */}
                            <div className="border-t border-slate-100 pt-6">
                                <h3 className="text-sm font-bold text-slate-800 mb-4">Metadata</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={`flex items-start gap-3 p-3 rounded-lg ${displayTask.postpone_count ? 'bg-rose-50' : 'bg-slate-50'}`}>
                                        <RotateCcw className={`w-4 h-4 ${displayTask.postpone_count ? 'text-rose-400' : 'text-slate-400'}`} />
                                        <div>
                                            <p className={`text-xs font-semibold ${displayTask.postpone_count ? 'text-rose-600' : 'text-slate-500'}`}>Postponed</p>
                                            <p className={`text-sm ${displayTask.postpone_count ? 'text-rose-700' : 'text-slate-700'}`}>{displayTask.postpone_count || 0} times</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-start gap-3 p-3 rounded-lg ${formData.is_completed ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                                        {
                                            formData.is_completed ? (
                                                <CircleCheckBig className={`w-4 h-4 text-emerald-400`} />
                                            ) : (
                                                <CircleX className={`w-4 h-4 text-amber-400`} />
                                            )
                                        }
                                        <div>
                                            <p className={`text-xs font-semibold ${formData.is_completed ? 'text-emerald-600' : 'text-amber-600'}`}>Completed On</p>
                                            <p className={`text-sm ${formData.is_completed ? 'text-emerald-800' : 'text-amber-800'}`}>{
                                                formData.is_completed ? formatDate(formData.completed_on) : 'Pending'
                                            }</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500">Created At</p>
                                            <p className="text-sm text-slate-700">{formatDate(displayTask.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500">Last Updated</p>
                                            <p className="text-sm text-slate-700">{formatDate(displayTask.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }


                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="cursor-pointer px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        className="cursor-pointer px-8 shadow-lg shadow-emerald-500/20"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPanel;
