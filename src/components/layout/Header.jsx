import { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

const Header = ({ onMenuClick, title = "Today", onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 550);

    // Trigger search when debounced value changes
    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onSearch]);

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={20} />
                </button>
                <h1 className="text-lg font-bold text-slate-800">{title}</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center relative">
                    <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-full w-56 sm:w-64 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.trim())}  //send trimed val
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
