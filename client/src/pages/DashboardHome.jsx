import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      label: 'Total Equipment',
      value: '142',
      change: '+12%',
      icon: Activity,
      color: 'text-accent-primary',
      bg: 'bg-accent-primary/10',
      border: 'border-accent-primary/20'
    },
    {
      label: 'Critical Alerts',
      value: '3',
      change: '-2',
      icon: AlertTriangle,
      color: 'text-accent-danger',
      bg: 'bg-accent-danger/10',
      border: 'border-accent-danger/20'
    },
    {
      label: 'Avg Health Score',
      value: '94%',
      change: '+2.4%',
      icon: CheckCircle,
      color: 'text-accent-success',
      bg: 'bg-accent-success/10',
      border: 'border-accent-success/20'
    },
    {
      label: 'Maintenance ROI',
      value: '$12.5k',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-accent-secondary',
      bg: 'bg-accent-secondary/10',
      border: 'border-accent-secondary/20'
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-background-primary/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-background-primary/30 ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent-primary" />
            Maintenance Activity
          </h3>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
            <p className="text-text-muted">Chart Component Placeholder</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent-warning" />
            Recent Alerts
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-accent-warning bg-accent-warning/10 px-2 py-1 rounded-md">Warning</span>
                  <span className="text-xs text-text-muted">2m ago</span>
                </div>
                <p className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors">Hydraulic Pressure Low</p>
                <p className="text-xs text-text-secondary mt-1">Press #4 - Main Line</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
