import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  ClipboardList,
  Box,
  Calendar,
  BarChart2,
  LogOut,
  Factory
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Box, label: 'Equipment', path: '/dashboard/equipment' },
    { icon: ClipboardList, label: 'Requests', path: '/dashboard/requests' },
    { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
    { icon: Users, label: 'Teams', path: '/dashboard/teams' },
    { icon: BarChart2, label: 'Reporting', path: '/dashboard/reporting' },
    { icon: Factory, label: 'Work Centers', path: '/dashboard/work-centers' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 flex flex-col bg-background-secondary/30 backdrop-blur-xl border-r border-white/5 z-30">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent opacity-50"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/20 flex items-center justify-center relative z-10">
          <span className="font-bold text-white text-lg">G</span>
        </div>
        <span className="text-xl font-bold text-white tracking-tight relative z-10">GearGuard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
              ${isActive
                ? 'text-white shadow-lg shadow-accent-primary/10'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-primary/5 border border-accent-primary/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-accent-primary' : 'group-hover:text-white'}`} />
                <span className="font-medium relative z-10">{item.label}</span>
                {item.path === '/dashboard/requests' && (
                  <span className="ml-auto relative z-10 bg-accent-danger/20 border border-accent-danger/20 text-accent-danger text-xs font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                    3
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary p-[2px] shadow-lg shadow-accent-primary/20 group-hover:shadow-accent-primary/40 transition-shadow">
            <div className="w-full h-full rounded-full bg-background-secondary flex items-center justify-center overflow-hidden">
              <span className="font-bold text-white text-sm">JD</span>
            </div>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-white truncate group-hover:text-accent-primary transition-colors">{user?.name || 'User'}</p>
            <p className="text-xs text-text-muted truncate">{user?.role || 'Loading...'}</p>
          </div>
          <LogOut className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
