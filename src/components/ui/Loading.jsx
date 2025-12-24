import { Loader2 } from 'lucide-react';

const Loading = ({ text = "Loading..." }) => {
    return (
        <div className="flex items-center justify-center text-slate-400">
            <Loader2 className="mr-2.5 w-6 h-6 text-emerald-500 animate-spin" />
            <div className="my-auto">{text}</div>
        </div>
    );
};

export default Loading;