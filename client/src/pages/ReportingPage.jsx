import { useState } from 'react';
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
        legend: { display: false } // Disable generic legend to use custom one for layout control
    }
};

// ... (keep existing code)

const ReportingPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Month');

    // Dynamic Data Map
    const chartData = {
        Week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            total: [12, 19, 15, 25, 22, 30, 45],
            completed: [10, 15, 12, 20, 18, 25, 40],
            status: [45, 12, 8, 3], // Completed, In Progress, Pending, Critical
            team: [20, 28, 15, 18],
            // KPI Data for Week
            kpis: {
                totalRequests: { value: '168', change: '+8%' },
                completionRate: { value: '83.3%', change: '+1.2%' },
                avgResolution: { value: '3.5h', change: '-12%' },
                criticalIssues: { value: '3', change: '-1' }
            }
        },
        Month: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            total: [65, 59, 80, 81, 56, 55, 40, 60, 70, 80, 90, 100],
            completed: [50, 45, 70, 75, 40, 45, 30, 50, 60, 70, 80, 90],
            status: [100, 50, 100, 45],
            team: [120, 150, 90, 110],
            // KPI Data for Month
            kpis: {
                totalRequests: { value: '836', change: '+12%' },
                completionRate: { value: '94.2%', change: '+2.4%' },
                avgResolution: { value: '4.2h', change: '-18%' },
                criticalIssues: { value: '5', change: '-2' }
            }
        },
        Year: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            total: [500, 750, 900, 1100, 1248],
            completed: [450, 700, 850, 1050, 1180],
            status: [2000, 400, 300, 150],
            team: [800, 950, 700, 850],
            // KPI Data for Year
            kpis: {
                totalRequests: { value: '4,498', change: '+24%' },
                completionRate: { value: '91.8%', change: '+5.6%' },
                avgResolution: { value: '5.1h', change: '-22%' },
                criticalIssues: { value: '18', change: '-8' }
            }
        }
    };

    const currentData = chartData[selectedPeriod];

    // Dynamic KPIs based on selected period
    const KPIS = [
        { label: 'Total Requests', value: currentData.kpis.totalRequests.value, change: currentData.kpis.totalRequests.change, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Completion Rate', value: currentData.kpis.completionRate.value, change: currentData.kpis.completionRate.change, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Avg. Resolution', value: currentData.kpis.avgResolution.value, change: currentData.kpis.avgResolution.change, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { label: 'Critical Issues', value: currentData.kpis.criticalIssues.value, change: currentData.kpis.criticalIssues.change, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
    ];

    const monthlyData = {
        labels: currentData.labels,
        datasets: [
            {
                label: 'Total Requests',
                data: currentData.total,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Completed Requests',
                data: currentData.completed,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const statusDistributionData = {
        labels: ['Completed', 'In Progress', 'Pending', 'Critical'],
        datasets: [
            {
                data: currentData.status,
                backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
                borderColor: '#1F2937',
                borderWidth: 2,
            },
        ],
    };

    const teamPerformanceData = {
        labels: ['Team A', 'Team B', 'Team C', 'Team D'],
        datasets: [
            {
                label: 'Requests Handled',
                data: currentData.team,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                barThickness: 50,
                maxBarThickness: 50,
            },
        ],
    };

    const totalRequests = currentData.status.reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-text-primary">Analytics & Reports</h2>
                     <p className="text-text-secondary">Overview of maintenance performance and system health.</p>
                </div>
                <div className="flex bg-background-card p-1 rounded-lg border border-border">
                    {['Week', 'Month', 'Year'].map((period) => (
                        <button 
                            key={period} 
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                selectedPeriod === period 
                                ? 'bg-accent-primary text-white shadow-sm' 
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                        >
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
                    <div className="h-[300px] flex items-center justify-center gap-8">
                        {/* Chart Container */}
                        <div className="relative w-48 h-48">
                            <Doughnut options={doughnutOptions} data={statusDistributionData} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-text-primary">{totalRequests}</span>
                                <span className="text-xs text-text-muted">Total</span>
                            </div>
                        </div>

                        {/* Custom Legend */}
                        <div className="space-y-3">
                            {statusDistributionData.labels.map((label, index) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div 
                                        className="w-3 h-3 rounded-full" 
                                        style={{ backgroundColor: statusDistributionData.datasets[0].backgroundColor[index] }}
                                    ></div>
                                    <span className="text-sm text-text-secondary">{label}</span>
                                </div>
                            ))}
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
