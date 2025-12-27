import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, AlertTriangle, Clock, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- KPI Data ---
const KPIS = [
    { label: 'Total Requests', value: '1,248', change: '+12%', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Completion Rate', value: '94.2%', change: '+2.4%', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Avg. Resolution', value: '4.2h', change: '-18%', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Critical Issues', value: '5', change: '-2', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
];

// --- Chart Options ---
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: { color: '#9BA3AF', usePointStyle: true, boxWidth: 6 },
        },
        tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#F3F4F6',
            bodyColor: '#D1D5DB',
            borderColor: 'rgba(75, 85, 99, 0.4)',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            usePointStyle: true,
        },
    },
    scales: {
        y: {
            ticks: { color: '#6B7280' },
            grid: { color: 'rgba(75, 85, 99, 0.1)' },
            border: { display: false }
        },
        x: {
            ticks: { color: '#6B7280' },
            grid: { display: false },
            border: { display: false }
        }
    }
};

const lineOptions = {
    ...commonOptions,
    plugins: {
        ...commonOptions.plugins,
        title: { display: false },
    },
    tension: 0.4, // Smooth curves
};

const doughnutOptions = {
    ...commonOptions,
    cutout: '70%',
    scales: { x: { display: false }, y: { display: false } },
    plugins: {
        ...commonOptions.plugins,
        legend: { position: 'right', labels: { color: '#9BA3AF', boxWidth: 12 } } // Legend on right for doughnut
    }
};

// --- Chart Data ---

const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Incoming Requests',
            data: [65, 59, 80, 81, 56, 95],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#1F2937',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3B82F6',
        },
        {
            label: 'Resolved',
            data: [60, 55, 75, 78, 54, 90],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.0)', // No fill for second line
            borderDash: [5, 5],
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#1F2937',
        }
    ]
};

const teamPerformanceData = {
    labels: ['Alpha Squad', 'Beta Techs', 'Gamma Crew', 'Delta Team'],
    datasets: [
        {
            label: 'On-Time',
            data: [45, 38, 50, 25],
            backgroundColor: '#3B82F6',
            borderRadius: 4,
        },
        {
            label: 'Overdue',
            data: [5, 12, 3, 2],
            backgroundColor: '#EF4444',
            borderRadius: 4,
        },
    ]
};

const statusDistributionData = {
    labels: ['Completed', 'In Progress', 'Pending Review', 'Scrap'],
    datasets: [
        {
            data: [350, 120, 80, 45],
            backgroundColor: [
                '#10B981', // Green
                '#3B82F6', // Blue
                '#F59E0B', // Yellow
                '#EF4444', // Red
            ],
            borderWidth: 0,
            hoverOffset: 4
        }
    ]
};

const ReportingPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-text-primary">Analytics & Reports</h2>
                     <p className="text-text-secondary">Overview of maintenance performance and system health.</p>
                </div>
                <div className="flex bg-background-card p-1 rounded-lg border border-border">
                    {['Week', 'Month', 'Year'].map((period) => (
                        <button key={period} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${period === 'Month' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
                            {period}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-background-card border border-border rounded-xl p-5 hover:border-accent-primary/30 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${kpi.bg}`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kpi.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary">{kpi.value}</h3>
                        <p className="text-sm text-text-secondary">{kpi.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-background-card border border-border rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text-primary">Request Volume Trends</h3>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                            <TrendingUp className="w-4 h-4 text-accent-success" />
                            <span>+8% vs last period</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <Line options={lineOptions} data={monthlyData} />
                    </div>
                </motion.div>

                {/* Status Distribution */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1 bg-background-card border border-border rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-text-primary mb-6">Request Distribution</h3>
                    <div className="h-[300px] flex items-center justify-center relative">
                        <Doughnut options={doughnutOptions} data={statusDistributionData} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-text-primary">595</span>
                            <span className="text-xs text-text-muted">Total</span>
                        </div>
                    </div>
                </motion.div>
                
                {/* Team Performance */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-3 bg-background-card border border-border rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text-primary">Team Performance Analysis</h3>
                    </div>
                    <div className="h-[250px] w-full">
                        <Bar options={commonOptions} data={teamPerformanceData} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReportingPage;
