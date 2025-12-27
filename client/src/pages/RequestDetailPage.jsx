import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ChevronDown,
  Clock,
  User,
  FileText,
  Info,
  ArrowLeft
} from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('notes');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    maintenance_for: 'equipment',
    equipment: '',
    category: 'Mechanical',
    request_date: '',
    maintenance_type: 'corrective',
    team: '',
    technician: '',
    scheduled_date: '',
    duration: '00:00',
    priority: 'low',
    status: 'NEW',
    description: '',
    instructions: ''
  });

  /* ---------------- FETCH REQUEST ---------------- */
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/requests/${id}`);
        const data = await res.json();

        if (!data.success) {
          toast.error('Request not found');
          navigate('/dashboard/requests');
          return;
        }

        setFormData(data.request);
      } catch (err) {
        toast.error('Failed to load request');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, navigate]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/requests/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success('Request updated successfully');
      } else {
        toast.error('Update failed');
      }
    } catch {
      toast.error('Server error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-text-secondary">Loading request…</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-lg text-text-muted"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Edit Maintenance Request #{id}
          </h1>
          <p className="text-text-secondary text-sm">
            Update request details and status
          </p>
        </div>
      </div>

      <div className="bg-[#161B22] border border-white/10 rounded-2xl p-6 md:p-8">

        {/* SUBJECT */}
        <div className="mb-8">
          <label className="text-sm text-text-secondary">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full text-xl bg-background-primary/30 border border-white/10 rounded-xl px-4 py-3 text-white"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          <div className="space-y-4">
            <select name="priority" value={formData.priority} onChange={handleChange}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white">
              <option value="NEW">NEW</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <input
              type="date"
              name="request_date"
              value={formData.request_date?.split('T')[0]}
              onChange={handleChange}
              ref={dateInputRef}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="space-y-4">
            <input
              name="technician"
              value={formData.technician}
              onChange={handleChange}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="Technician"
            />

            <input
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="Team"
            />

            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="Duration (HH:MM)"
            />
          </div>
        </div>

        {/* NOTES */}
        <div className="mb-6">
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full min-h-[140px] bg-background-primary/30 border border-white/10 rounded-xl p-4 text-white"
            placeholder="Description"
          />
        </div>

        <div className="mb-6">
          <textarea
            name="instructions"
            value={formData.instructions || ''}
            onChange={handleChange}
            className="w-full min-h-[140px] bg-background-primary/30 border border-white/10 rounded-xl p-4 text-white"
            placeholder="Instructions"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
