import { useState, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

const Header = ({ onMenuClick, title = "Today", onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 550);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Trigger search when debounced value changes
    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onSearch]);

    return (
        <header className="h-16 sm:bg-white/80 sm:backdrop-blur-md sm:border-b sm:border-slate-100 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={22} />
                </button>
                <h1 className="hidden sm:inline text-lg font-bold text-slate-800">{title}</h1>
            </div>
            <div className="flex items-center gap-1.5">
                {/* Mobile Toggle Button - Hidden on Desktop */}
                <div
                    onClick={() => {
                        if (isSearchOpen) {
                            setIsSearchOpen(false);
                            setSearchQuery(""); // Clear search when closing
                        } else {
                            setIsSearchOpen(true);
                        }
                    }}
                    className="sm:hidden rounded-full bg-white w-10 h-10 p-2 flex items-center justify-center cursor-pointer text-emerald-500">
                    {isSearchOpen ? <X size={21} /> : <Search size={21} />}
                </div>

                {/* Search Input Container - Hidden on mobile unless open, Always visible on Desktop */}
                <div
                    className={`
                        flex items-center gap-2 sm:gap-4 
                        transition-all duration-300 ease-in-out overflow-hidden
                        ${isSearchOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0 sm:w-auto sm:opacity-100'} 
                    `}
                >
                    <div className="flex items-center relative w-full">
                        <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-full w-full sm:w-96 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
