import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Users, ClipboardList, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

// Mock Data
const mockRequests = [
  { id: 1, subject: 'Hydraulic Press Oil Leak', employee: 'Mitchell Admin', technician: 'Ann Foster', category: 'Hydraulic', stage: 'New Request', company: 'GearGuard Industries' },
  { id: 2, subject: 'CNC Calibration Required', employee: 'Sarah Chen', technician: 'Mike Wilson', category: 'CNC Machine', stage: 'In Progress', company: 'GearGuard Industries' },
  { id: 3, subject: 'Conveyor Belt Replacement', employee: 'John Smith', technician: 'Ann Foster', category: 'Conveyor', stage: 'New Request', company: 'GearGuard Industries' },
  { id: 4, subject: 'Compressor Noise Issue', employee: 'David Park', technician: 'Tom Harris', category: 'Compressor', stage: 'Overdue', company: 'GearGuard Industries' },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = mockRequests.filter(req =>
    req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.technician.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Critical Equipment',
      value: '5 Units',
      subtitle: '(Health < 30%)',
      color: 'red',
      icon: AlertTriangle,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400'
    },
    {
      title: 'Technician Load',
      value: '85% Utilized',
      subtitle: '(Assign Carefully)',
      color: 'blue',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Open Requests',
      value: '12 Pending',
      subtitle: '3 Overdue',
      color: 'green',
      icon: ClipboardList,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      textColor: 'text-emerald-400'
    }
  ];

  const getStageColor = (stage) => {
    switch (stage) {
      case 'New Request':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In Progress':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Overdue':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with New Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Maintenance Dashboard</h1>
        <Button
          variant="primary"
          size="sm"
          className="shadow-lg shadow-accent-primary/20"
          onClick={() => navigate('/dashboard/create-request')}
        >
          + New
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{stat.title}</p>
                <h3 className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                <p className="text-text-muted text-xs mt-1">{stat.subtitle}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className={`w-4 h-4 ${stat.textColor}`} />
              <span className="text-text-secondary">Updated 2 mins ago</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search requests, employees, technicians..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-background-secondary/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all"
        />
      </div>

      {/* Requests Table */}
      <div className="bg-background-secondary/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-background-secondary/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Subject</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Employee</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Technician</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Stage</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary uppercase tracking-wider">Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6">
                    <span className="text-white font-medium group-hover:text-accent-primary transition-colors">
                      {request.subject}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{request.employee}</td>
                  <td className="py-4 px-6 text-text-secondary">{request.technician}</td>
                  <td className="py-4 px-6 text-text-secondary">{request.category}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(request.stage)}`}>
                      {request.stage}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{request.company}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No requests found matching "{searchQuery}"
          </div>
        )}
      </div>


    </div>
  );
};

export default DashboardHome;
