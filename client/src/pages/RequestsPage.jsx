import KanbanBoard from '../components/kanban/KanbanBoard';

const MOCK_REQUESTS = [
  { id: 'REQ-101', subject: 'Hydraulic Press Leak', equipmentName: 'HP-2000 Press', priority: 'HIGH', status: 'NEW', technician: null, estimatedDuration: 4, type: 'CORRECTIVE' },
  { id: 'REQ-102', subject: 'Conveyor Belt Misalignment', equipmentName: 'Line A Conveyor', priority: 'MEDIUM', status: 'IN_PROGRESS', technician: 'Jane Doe', estimatedDuration: 2, type: 'CORRECTIVE' },
  { id: 'REQ-103', subject: 'Monthly AC Service', equipmentName: 'Server Room AC', priority: 'LOW', status: 'NEW', technician: null, estimatedDuration: 1, type: 'PREVENTIVE' },
  { id: 'REQ-104', subject: 'Control Panel Short Circuit', equipmentName: 'CNC Milling M1', priority: 'CRITICAL', status: 'IN_PROGRESS', technician: 'Mike Smith', estimatedDuration: 8, type: 'CORRECTIVE' },
  { id: 'REQ-105', subject: 'Oil Change', equipmentName: 'Forklift F-04', priority: 'MEDIUM', status: 'REPAIRED', technician: 'John Doe', estimatedDuration: 1.5, type: 'PREVENTIVE' },
  { id: 'REQ-106', subject: 'Sensor Calibration', equipmentName: 'Robotic Arm R-02', priority: 'HIGH', status: 'SCRAP', technician: 'Tech Lead', estimatedDuration: 3, type: 'CORRECTIVE' },
];

const RequestsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-text-primary">Maintenance Requests</h2>
           <p className="text-text-secondary">Drag and drop cards to update status</p>
        </div>
      </div>
      
      <KanbanBoard initialRequests={MOCK_REQUESTS} />
    </div>
  );
};

export default RequestsPage;
