import { useState } from 'react';
import { Plus } from 'lucide-react';
import KanbanBoard from '../components/kanban/KanbanBoard';
import Button from '../components/ui/Button';
import CreateRequestModal from '../components/forms/CreateRequestModal';

const MOCK_REQUESTS = [
  { id: 'REQ-101', subject: 'Hydraulic Press Leak', equipmentName: 'HP-2000 Press', priority: 'HIGH', status: 'NEW', technician: null, estimatedDuration: 4, type: 'CORRECTIVE' },
  { id: 'REQ-102', subject: 'Conveyor Belt Misalignment', equipmentName: 'Line A Conveyor', priority: 'MEDIUM', status: 'IN_PROGRESS', technician: 'Jane Doe', estimatedDuration: 2, type: 'CORRECTIVE' },
  { id: 'REQ-103', subject: 'Monthly AC Service', equipmentName: 'Server Room AC', priority: 'LOW', status: 'NEW', technician: null, estimatedDuration: 1, type: 'PREVENTIVE' },
  { id: 'REQ-104', subject: 'Control Panel Short Circuit', equipmentName: 'CNC Milling M1', priority: 'CRITICAL', status: 'IN_PROGRESS', technician: 'Mike Smith', estimatedDuration: 8, type: 'CORRECTIVE' },
  { id: 'REQ-105', subject: 'Oil Change', equipmentName: 'Forklift F-04', priority: 'MEDIUM', status: 'REPAIRED', technician: 'John Doe', estimatedDuration: 1.5, type: 'PREVENTIVE' },
  { id: 'REQ-106', subject: 'Sensor Calibration', equipmentName: 'Robotic Arm R-02', priority: 'HIGH', status: 'SCRAP', technician: 'Tech Lead', estimatedDuration: 3, type: 'CORRECTIVE' },
];

const RequestsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Maintenance Requests</h2>
          <p className="text-text-secondary">Drag and drop cards to update status</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="shadow-lg shadow-accent-primary/20"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" /> New Request
        </Button>
      </div>

      <KanbanBoard initialRequests={MOCK_REQUESTS} />

      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default RequestsPage;
