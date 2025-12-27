import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Wrench,
  Calendar as CalIcon,
  AlertTriangle
} from 'lucide-react';

import Button from '../components/ui/Button';
import TrustScore from '../components/equipment/TrustScore';
import DebtMeter from '../components/equipment/DebtMeter';

// Mock Data Lookup
const MOCK_EQUIPMENT = {
  'EQ-101': { id: 'EQ-101', name: 'HP-2000 Hydraulic Press', serialNumber: 'SN-998877', category: 'Mechanical', location: 'Floor A', status: 'Active', trustScore: 85, debtLevel: 15, department: 'Production', purchaseDate: '2022-03-15', lastMaintenance: '2023-12-01', nextMaintenance: '2024-01-01' },
  'EQ-102': { id: 'EQ-102', name: 'Server Rack Main', serialNumber: 'SN-IT-001', category: 'IT', location: 'Server Room', status: 'Active', trustScore: 98, debtLevel: 2, department: 'IT Infra', purchaseDate: '2023-01-10', lastMaintenance: '2023-12-15', nextMaintenance: '2024-06-15' },
  'EQ-103': { id: 'EQ-103', name: 'CNC Milling M1', serialNumber: 'SN-CNC-55', category: 'Mechanical', location: 'Floor B', status: 'Warning', trustScore: 45, debtLevel: 80, department: 'Machining', purchaseDate: '2020-05-20', lastMaintenance: '2023-08-01', nextMaintenance: '2023-09-01 (Overdue)' },
};

const EquipmentDetailPage = () => {
  const { id } = useParams();
  const equipment = MOCK_EQUIPMENT[id] || MOCK_EQUIPMENT['EQ-101']; // Fallback for demo

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/equipment" className="p-2 hover:bg-background-card rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </Link>
        <div>
            <h2 className="text-2xl font-bold text-text-primary">{equipment.name}</h2>
            <p className="text-text-secondary text-sm">Serial: {equipment.serialNumber}</p>
        </div>
        <div className="ml-auto flex gap-3">
             <Button variant="outline" size="sm">Edit Details</Button>
             <Button variant="danger" size="sm">Report Issue</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital Signs */}
        <div className="bg-background-card border border-border rounded-xl p-6 lg:col-span-1 space-y-8">
            <h3 className="font-semibold text-text-primary border-b border-border pb-2">Vital Signs</h3>
            
            <div className="flex justify-center py-4">
                <TrustScore score={equipment.trustScore} />
            </div>

            <DebtMeter debtLevel={equipment.debtLevel} />

            <div className="bg-background-secondary rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-text-muted">Last Maintenance</span>
                    <span className="text-text-primary">{equipment.lastMaintenance}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-text-muted">Next Scheduled</span>
                    <span className={equipment.debtLevel > 50 ? 'text-accent-danger font-bold' : 'text-text-primary'}>
                        {equipment.nextMaintenance}
                    </span>
                </div>
            </div>
        </div>

        {/* Details & History */}
         <div className="bg-background-card border border-border rounded-xl p-6 lg:col-span-2 space-y-6">
            <h3 className="font-semibold text-text-primary border-b border-border pb-2">Operational Data</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background-secondary border border-border">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Category</p>
                    <p className="font-medium text-lg flex items-center gap-2 mt-1">
                        <Tool className="w-4 h-4 text-accent-primary" /> {equipment.category}
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-background-secondary border border-border">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Department</p>
                    <p className="font-medium text-lg mt-1">{equipment.department}</p>
                </div>
                <div className="p-4 rounded-lg bg-background-secondary border border-border">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Location</p>
                    <p className="font-medium text-lg mt-1">{equipment.location}</p>
                </div>
                <div className="p-4 rounded-lg bg-background-secondary border border-border">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Status</p>
                    <p className={`font-medium text-lg mt-1 flex items-center gap-2 ${equipment.status === 'Warning' ? 'text-accent-warning' : 'text-accent-success'}`}>
                        {equipment.status === 'Warning' && <AlertTriangle className="w-4 h-4" />}
                        {equipment.status}
                    </p>
                </div>
            </div>

            <h3 className="font-semibold text-text-primary border-b border-border pb-2 pt-4">Recent History</h3>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-background-secondary rounded-lg transition-colors border border-transparent hover:border-border cursor-pointer">
                        <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                            <CalIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">Routine Checkup #{100+i}</p>
                            <p className="text-xs text-text-muted">Completed by John Doe on Dec {20-i}, 2023</p>
                        </div>
                        <span className="text-xs text-accent-success bg-accent-success/10 px-2 py-1 rounded-full">Completed</span>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPage;
