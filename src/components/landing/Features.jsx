import { Sun, Calendar, RefreshCw } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Sun className="w-6 h-6 text-brand-600" />,
            bgIcon: <Sun className="w-32 h-32 text-brand-200" />,
            color: "bg-brand-100",
            title: "Today-First Planning",
            description: "Start every morning with a blank slate. Consciously pick a few tasks for \"Today\". Focus on the now."
        },
        {
            icon: <Calendar className="w-6 h-6 text-rose-500" />,
            bgIcon: <Calendar className="w-32 h-32 text-rose-200" />,
            color: "bg-rose-100",
            title: "Overdue Without Anxiety",
            description: "Tasks didn't get done? No guilt trips. Unfinished tasks can be simply rolled over, to next day."
        },
        {
            icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
            bgIcon: <RefreshCw className="w-32 h-32 text-amber-200" />,
            color: "bg-amber-100",
            title: "Easy Rescheduling",
            description: "Life happens. Reschedule tasks with a single click for \"Today\" or \"Tomorrow\"."
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-3">Features</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Built for <span className="text-brand-600">deep work,</span> <br />
                        not busy work.
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        A minimal system designed to help you organize your thoughts, prioritize what matters, and execute without distraction.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="relative overflow-hidden p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white group h-full">
                            {/* Watermark Icon */}
                            <div className="absolute -top-6 -right-6 opacity-20 transform rotate-12 transition-transform group-hover:rotate-6 group-hover:scale-110 pointer-events-none">
                                {feature.bgIcon}
                            </div>

                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 relative z-10`}>
                                {feature.icon}
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{feature.title}</h4>
                            <p className="text-slate-500 leading-relaxed relative z-10 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
