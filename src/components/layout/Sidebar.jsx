import { NavLink } from 'react-router-dom';
import { Rocket, LayoutDashboard, Calendar, CheckSquare, Settings, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Today', path: '/today' },
        { icon: CheckSquare, label: 'Completed', path: '/completed' },
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
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-100 shadow-xl lg:shadow-none
        transition-transform duration-300 ease-spring
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-50">
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

                    {/* Footer User Profile (Static for now) */}
                    <div className="p-4 border-t border-slate-50">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
                                <p className="text-xs text-slate-500 truncate">Welcome</p>
                            </div>
                            <button className="text-slate-400 hover:text-rose-500 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
