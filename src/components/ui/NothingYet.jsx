import { PackageOpen } from 'lucide-react';

export default function NothingYet({ title = "Nothing here", message = "You have nothing added here yet" }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-bounce-in">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <PackageOpen className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-600 font-medium text-lg">{title}</h3>
            <p className="text-slate-400 text-sm max-w-xs mt-1">
                {message}
            </p>
        </div>
    );
}