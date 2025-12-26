export default function ProblemSolution() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Most to-do apps are <br /> <span className="text-red-500">guilt generators.</span>
                        </h2>
                        <div className="space-y-6 sm:text-lg text-slate-600">
                            <p>
                                You add tasks. You don't do them. They pile up. You see a red badge with "42 overdue tasks". You feel bad. You stop opening the app.
                            </p>
                            <p>
                                We call this the <strong className="text-slate-900">Archive of Good Intentions</strong>.
                            </p>
                            <p>
                                It doesn't have to be this way.
                            </p>
                        </div>
                    </div>
                    <div className="bg-brand-50 p-8 rounded-3xl border border-brand-100">
                        <h3 className="text-2xl font-bold text-brand-900 mb-4">The DoIT Way</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-brand-200 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-brand-700 text-sm">✓</span>
                                </div>
                                <p className="text-brand-800">
                                    <strong className="block text-brand-900">Today is a fresh start.</strong>
                                    Overdue tasks don't scream at you. They sit quietly in the backlog until you're ready.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-brand-200 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-brand-700 text-sm">✓</span>
                                </div>
                                <p className="text-brand-800">
                                    <strong className="block text-brand-900">Focus on the now.</strong>
                                    Only see what you planned for today. No overwhelming lists.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-brand-200 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-brand-700 text-sm">✓</span>
                                </div>
                                <p className="text-brand-800">
                                    <strong className="block text-brand-900">Forgiving by design.</strong>
                                    Missed a task? It happens. Reschedule it in one click.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
