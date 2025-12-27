import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  ClipboardList,
  Box,
  Calendar,
  BarChart2,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Box, label: 'Equipment', path: '/dashboard/equipment' },
    { icon: ClipboardList, label: 'Requests', path: '/dashboard/requests' },
    { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
    { icon: Users, label: 'Teams', path: '/dashboard/teams' },
    { icon: BarChart2, label: 'Reporting', path: '/dashboard/reporting' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col border-r border-white/5 bg-background-card/80 backdrop-blur-xl z-30">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center shadow-lg shadow-accent-primary/20">
          <span className="font-bold text-white">G</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent tracking-tight">
          GearGuard
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                ? 'text-white bg-white/10 shadow-lg shadow-black/10 border border-white/5'
                : 'text-text-secondary hover:bg-white/5 hover:text-white hover:border hover:border-white/5 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <link.icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-accent-primary' : 'group-hover:text-accent-primary'}`} />
                <span className="font-medium relative z-10">{link.label}</span>
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary p-[2px] shadow-lg shadow-accent-primary/20 group-hover:shadow-accent-primary/40 transition-shadow">
            <div className="w-full h-full rounded-full bg-background-secondary flex items-center justify-center overflow-hidden">
              <span className="font-bold text-white text-sm">JD</span>
            </div>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-white truncate group-hover:text-accent-primary transition-colors">John Doe</p>
            <p className="text-xs text-text-muted truncate">Maintenance Manager</p>
          </div>
          <LogOut className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
