import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import KanbanBoard from '../components/kanban/KanbanBoard';
import Button from '../components/ui/Button';

const RequestsPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Transform data to match KanbanBoard format
        const transformedRequests = data.requests.map(req => ({
          id: `REQ-${req.id}`,
          subject: req.subject,
          equipmentName: req.equipment || 'N/A',
          employee: req.employee_name,
          technician: req.technician || 'Unassigned',
          category: req.category,
          priority: req.priority.toUpperCase(),
          status: req.status,
          estimatedDuration: parseFloat(req.duration) || 0,
          type: req.maintenance_type.toUpperCase(),
          company: req.company || 'GearGuard Industries'
        }));

        setRequests(transformedRequests);
      } else {
        toast.error('Failed to load requests');
      }
    } catch (error) {
      console.error('Fetch requests error:', error);
      toast.error('Error loading requests');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-secondary">Loading requests...</div>
      </div>
    );
  }

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
          onClick={() => navigate('/dashboard/create-request')}
        >
          <Plus className="w-5 h-5 mr-2" /> New Request
        </Button>
      </div>

      <KanbanBoard initialRequests={requests} />
    </div>
  );
};

export default RequestsPage;
