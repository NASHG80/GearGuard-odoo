import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Wrench,
    Calendar as CalIcon,
    AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

import Button from '../components/ui/Button';
import TrustScore from '../components/equipment/TrustScore';
import DebtMeter from '../components/equipment/DebtMeter';

const EquipmentDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEquipmentDetails();
    }, [id]);

    const fetchEquipmentDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/equipment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
                }
            });
            const data = await response.json();

            if (data.success) {
                // Transform DB fields to match UI expectations
                const eq = data.equipment;
                setEquipment({
                    ...eq,
                    serialNumber: eq.serial_number,
                    trustScore: eq.trust_score || 100,
                    debtLevel: eq.debt_level || 0,
                    lastMaintenance: eq.last_maintenance ? new Date(eq.last_maintenance).toLocaleDateString() : 'Never',
                    nextMaintenance: eq.next_maintenance ? new Date(eq.next_maintenance).toLocaleDateString() : 'Not Scheduled',
                    purchaseDate: eq.acquisition_date ? new Date(eq.acquisition_date).toLocaleDateString() : 'Unknown'
                });
            } else {
                toast.error('Failed to load equipment details');
                navigate('/dashboard/equipment');
            }
        } catch (error) {
            console.error('Fetch details error:', error);
            toast.error('Error loading details');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (score) => {
        if (score < 50) return 'border-error/50 shadow-lg shadow-error/10';
        if (score < 80) return 'border-warning/50 shadow-lg shadow-warning/10';
        return 'border-success/50 shadow-lg shadow-success/10';
    };

    if (loading) return <div className="text-center py-10 text-text-secondary">Loading details...</div>;
    if (!equipment) return null;

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
                    <Button variant="outline" className="relative group">
                        <span className="flex flex-col items-center">
                            <span className="text-xs font-bold text-accent-primary">0 Open</span>
                            <span className="text-[10px] text-text-muted">Requests</span>
                        </span>
                    </Button>
                    <Button variant="outline" size="sm">Edit Details</Button>
                    <Button variant="danger" size="sm">Report Issue</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vital Signs */}
                <div className={`bg-background-card border rounded-xl p-6 lg:col-span-1 space-y-8 ${getStatusColor(equipment.trustScore)}`}>
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
                                <Wrench className="w-4 h-4 text-accent-primary" /> {equipment.category}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-background-secondary border border-border">
                            <p className="text-xs text-text-muted uppercase tracking-wider">Manufacturer</p>
                            <p className="font-medium text-lg mt-1">{equipment.manufacturer || 'N/A'}</p>
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
                        <div className="text-center text-text-muted text-sm py-4">
                            No maintenance history available yet.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetailPage;
