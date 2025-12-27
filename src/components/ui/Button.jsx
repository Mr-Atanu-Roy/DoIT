import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    disabled,
    type = 'button',
    ...props
}, ref) => {

    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-sm hover:shadow-md",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 focus:ring-slate-200",
        ghost: "bg-transparent text-emerald-600 hover:bg-emerald-50",
        text: "text-slate-500 hover:text-slate-900",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
    };

    const sizes = "px-4 py-2 text-sm";

    return (
        <button
            ref={ref}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
