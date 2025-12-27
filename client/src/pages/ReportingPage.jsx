import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: '#E6EDF3' }
    },
    title: {
      display: true,
      text: 'Requests per Team',
      color: '#E6EDF3'
    },
  },
  scales: {
    y: {
        ticks: { color: '#9BA3AF' },
        grid: { color: '#1F2937' }
    },
    x: {
        ticks: { color: '#9BA3AF' },
        grid: { display: false }
    }
  }
};

const data = {
  labels: ['Alpha Squad', 'Beta Techs', 'Gamma Crew'],
  datasets: [
    {
      label: 'Open Requests',
      data: [12, 19, 3],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: '#3B82F6',
      borderWidth: 1,
    },
    {
      label: 'Completed',
      data: [8, 15, 7],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: '#22C55E',
      borderWidth: 1,
    },
  ],
};

const ReportingPage = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">Performance Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-background-card p-6 rounded-xl border border-border">
                    <Bar options={options} data={data} />
                </div>
                {/* Placeholder for Pivot or other graphs */}
                <div className="bg-background-card p-6 rounded-xl border border-border flex items-center justify-center text-text-muted">
                    Pivot Table Placeholder
                </div>
            </div>
        </div>
    );
};

export default ReportingPage;
