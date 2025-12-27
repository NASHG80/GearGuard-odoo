import { useNavigate } from 'react-router-dom';
import EquipmentCard from '../components/equipment/EquipmentCard';
import Button from '../components/ui/Button';

const MOCK_EQUIPMENT_LIST = [
  { id: 'EQ-101', name: 'HP-2000 Hydraulic Press', serialNumber: 'SN-998877', category: 'Mechanical', location: 'Floor A', status: 'Active', trustScore: 85 },
  { id: 'EQ-102', name: 'Server Rack Main', serialNumber: 'SN-IT-001', category: 'IT', location: 'Server Room', status: 'Active', trustScore: 98 },
  { id: 'EQ-103', name: 'CNC Milling M1', serialNumber: 'SN-CNC-55', category: 'Mechanical', location: 'Floor B', status: 'Active', trustScore: 45 },
  { id: 'EQ-104', name: 'Forklift F-04', serialNumber: 'SN-FL-04', category: 'Vehicle', location: 'Warehouse', status: 'Active', trustScore: 72 },
  { id: 'EQ-105', name: 'Packing Machine P-2', serialNumber: 'SN-PK-22', category: 'Electrical', location: 'Packing Zone', status: 'Active', trustScore: 91 },
  { id: 'EQ-106', name: 'Generator G-1', serialNumber: 'SN-GEN-01', category: 'Electrical', location: 'Power Plant', status: 'Active', trustScore: 60 },
];

const EquipmentPage = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-text-primary">Equipment Assets</h2>
            <p className="text-text-secondary">Manage and monitor asset health</p>
        </div>
        <Button variant="primary" size="md" onClick={() => navigate('/dashboard/create-equipment')}>+ Add Equipment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EQUIPMENT_LIST.map((eq) => (
            <EquipmentCard key={eq.id} equipment={eq} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentPage;
