import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

/**
 * TagSelect Component
 * A reusable dropdown component that mimics a tag/pill selector.
 * 
 * @param {string} label - The category label (e.g., "Status", "Priority")
 * @param {string} value - The current selected value ID
 * @param {Array} options - List of options {id, label, color?}
 * @param {Function} onChange - Callback when an option is selected
 */
const TagSelect = ({ label, value, options, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const currentOption = options.find((opt) => opt.id === value);
    const displayLabel = currentOption ? currentOption.label : "All";
    const isAll = value === 'all';

    return (
        <div className="relative inline-block" ref={containerRef}>
            <span className="text-slate-400 font-normal inline sm:hidden text-xs ml-1.5 mb-1">{label}:</span>

            {/* Tag Button */}
            <button
                type="button"
                onClick={!disabled ? () => setIsOpen(!isOpen) : null}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-xs font-medium transition-all duration-200 border  ${disabled ? "cursor-not-allowed" : "cursor-pointer"} select-none group
                    ${disabled ? "bg-slate-100 border-slate-200 text-slate-400"
                        : isOpen
                            ? "bg-slate-100 border-slate-300 text-slate-900 ring-2 ring-slate-100 ring-offset-1"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }
                    ${!isAll ? "bg-slate-50 border-slate-300" : ""}
                `}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-slate-400 font-normal sm:inline hidden">{label}:</span>
                <span className={`font-semibold ${!isAll ? "text-slate-800" : "text-slate-600"}`}>
                    {displayLabel}
                </span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && !disabled && (
                <div
                    className="absolute z-50 top-full left-0 mt-1 min-w-[140px] bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-left"
                    role="listbox"
                >
                    {options.map((option) => {
                        const isSelected = value === option.id;
                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    onChange(option.id);
                                    setIsOpen(false);
                                }}
                                role="option"
                                aria-selected={isSelected}
                                className={`
                                    w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer flex items-center justify-between
                                    ${isSelected
                                        ? "bg-slate-50 text-slate-900 font-medium"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    {option.color && (
                                        <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                    )}
                                    <span>{option.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TagSelect;
