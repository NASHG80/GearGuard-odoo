import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ClipboardList, 
  Box,
  Calendar,
  BarChart2
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
    <aside className="w-64 bg-background-card border-r border-border min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">G</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            GearGuard
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'text-accent-primary bg-accent-primary/10' 
                  : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background-secondary border border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-primary to-blue-400 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
            <p className="text-xs text-text-muted truncate">Maintenance Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
