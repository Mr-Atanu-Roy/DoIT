import { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className = '',
    containerClassName = '',
    ...props
}, ref) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-2.5 rounded-lg border bg-white
            transition-colors duration-200
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
            disabled:bg-slate-50 disabled:text-slate-500
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 hover:border-emerald-300'}
            ${className}
          `}
                    {...props}
                />
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
