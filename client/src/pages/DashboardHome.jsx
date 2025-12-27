import { motion } from 'framer-motion';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Placeholder Stat Cards */}
        {[
          { label: 'Total Equipment', value: '142', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
          { label: 'Open Requests', value: '12', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
          { label: 'Avg Health Score', value: '94%', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
          { label: 'Maintenance ROI', value: '$12.5k', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-xl border ${stat.color} backdrop-blur-sm`}>
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 rounded-xl border border-border bg-background-secondary/50 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Maintenance Activity</h3>
          <div className="h-full flex items-center justify-center text-text-muted text-sm">
            Graph Placeholder
          </div>
        </div>
        <div className="h-64 rounded-xl border border-border bg-background-secondary/50 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Critical Alerts</h3>
          <div className="h-full flex items-center justify-center text-text-muted text-sm">
            List Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
