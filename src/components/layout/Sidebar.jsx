import { NavLink, Link } from 'react-router-dom';
import { Rocket, CalendarClock, CheckSquare, Notebook, Settings, X, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    // Get user name from metadata or fallback to email part or "User"
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

    // Get initials
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const initials = getInitials(displayName);

    const navItems = [
        { icon: CalendarClock, label: 'Today', path: '/' },
        { icon: CheckSquare, label: 'Completed', path: '/completed' },
        { icon: Notebook, label: 'Notes', path: '/notes' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 lg:w-64 bg-white border-r border-slate-100 shadow-xl lg:shadow-none
        transition-transform duration-300 ease-spring
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="pt-4 lg:pt-1.5 h-16 flex items-center px-6 border-b border-slate-50">
                        <div className="flex items-center gap-2 font-extrabold text-4xl tracking-tight">
                            <Rocket className="w-7 h-7 text-emerald-600 animate-float" />
                            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">DoIT</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-auto lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer User Profile */}
                    <div className="p-4 border-t border-slate-50">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 min-w-[32px] rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs select-none">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate" title={displayName}>{displayName}</p>
                                <p className="text-xs text-slate-500 truncate">Welcome</p>
                            </div>
                            <Link to="/logout" className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors" title="Log Out">
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
