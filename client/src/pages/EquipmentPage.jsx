import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EquipmentCard from '../components/equipment/EquipmentCard';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const EquipmentPage = () => {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/equipment', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
        }
      });
      const data = await response.json();

      if (data.success) {
        // Transform data if necessary, or use as is if it matches EquipmentCard props
        // EquipmentCard expects: { id, name, serialNumber, category, location, status, trustScore }
        // Our DB returns: { id, name, serial_number, category, location, status, trust_score }
        const transformed = data.equipment.map(eq => ({
          ...eq,
          serialNumber: eq.serial_number,
          trustScore: eq.trust_score || 100 // Default trust score if null
        }));
        setEquipmentList(transformed);
      } else {
        toast.error('Failed to load equipment');
      }
    } catch (error) {
      console.error('Fetch equipment error:', error);
      toast.error('Error loading equipment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-text-secondary">Loading assets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Equipment Assets</h2>
          <p className="text-text-secondary">Manage and monitor asset health</p>
        </div>
        <Button variant="primary" size="md" onClick={() => navigate('/dashboard/create-equipment')}>+ Add Equipment</Button>
      </div>

      {equipmentList.length === 0 ? (
        <div className="text-center py-12 bg-background-secondary/30 rounded-xl border border-white/5">
          <p className="text-text-muted">No equipment found. Add your first asset!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentList.map((eq) => (
            <EquipmentCard key={eq.id} equipment={eq} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;
