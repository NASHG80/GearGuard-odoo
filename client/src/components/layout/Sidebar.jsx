import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wrench, 
  Users, 
  Settings, 
  ClipboardList, 
  Box 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Box, label: 'Equipment', path: '/dashboard/equipment' },
    { icon: ClipboardList, label: 'Requests', path: '/dashboard/requests' },
    { icon: Users, label: 'Teams', path: '/dashboard/teams' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-background-secondary border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-primary rounded-lg shadow-[0_0_10px_#3B82F6] flex items-center justify-center">
          <span className="font-bold text-white">G</span>
        </div>
        <span className="text-lg font-bold text-text-primary tracking-tight">GearGuard</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive 
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' 
                : 'text-text-secondary hover:bg-background-card hover:text-text-primary'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.path === '/dashboard/requests' && (
              <span className="ml-auto bg-accent-danger/20 text-accent-danger text-xs px-2 py-0.5 rounded-full">
                3
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background-card border border-border">
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
