import { useState, useEffect } from 'react';
import { X, CalendarClock, Tag, Clock, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const TaskDetailsPanel = ({ todo, isOpen, onClose, onSave }) => {
    // Local state for editing
    const [formData, setFormData] = useState({
        text: '',
        description: '',
        priority: 'medium',
        scheduledFor: 'tomorrow',
        completed: false
    });

    // Reset form when todo changes or panel opens
    useEffect(() => {
        if (todo) {
            setFormData({
                text: todo.text || '',
                description: todo.description || '',
                priority: todo.priority || 'medium',
                scheduledFor: todo.scheduledFor || 'tomorrow',
                completed: todo.completed || false
            });
        }
    }, [todo]);

    // Handle Closing
    const handleClose = () => {
        onClose();
    };

    // Handle Saving
    const handleSave = () => {
        onSave({
            ...todo,
            ...formData,
            // Update metadata timestamps if status changed
            completedOn: formData.completed && !todo.completed ? Date.now() : (formData.completed ? todo.completedOn : undefined)
        });
        onClose();
    };

    if (!isOpen || !todo) return null;

    // Helper to format date
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Never';
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out h-full">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Task Details</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* General Section */}
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Task Name</label>
                            <input
                                type="text"
                                className="w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
                                className="w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 focus:outline-none focus:border-emerald-500 bg-white"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</label>
                            <select
                                className="w-full h-10 rounded-lg border border-slate-200 px-3 text-slate-700 focus:outline-none focus:border-emerald-500 bg-white"
                                value={formData.scheduledFor}
                                onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
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
                            onClick={() => setFormData({ ...formData, completed: !formData.completed })}
                            className={`
                                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                                ${formData.completed ? 'bg-emerald-500' : 'bg-slate-300'}
                            `}
                        >
                            <span
                                className={`
                                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${formData.completed ? 'translate-x-6' : 'translate-x-1'}
                                `}
                            />
                        </button>
                    </div>

                    {/* Metadata Section (Read Only) */}
                    <div className="border-t border-slate-100 pt-6">
                        <h3 className="text-sm font-bold text-slate-800 mb-4">Metadata</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-500">Created At</p>
                                    <p className="text-sm text-slate-700">{formatDate(todo.createdAt)}</p>
                                </div>
                            </div>

                            {todo.completedOn && (
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50">
                                    <Clock className="w-4 h-4 text-emerald-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-emerald-600">Completed On</p>
                                        <p className="text-sm text-emerald-800">{formatDate(todo.completedOn)}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                <RotateCcw className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-500">Postponed</p>
                                    <p className="text-sm text-slate-700">{todo.postponeCount || 0} times</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        className="px-8 shadow-lg shadow-emerald-500/20"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPanel;
