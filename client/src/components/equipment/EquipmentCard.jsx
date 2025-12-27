import { Link } from 'react-router-dom';
import { Settings, MapPin, Activity } from 'lucide-react';
import TrustScore from './TrustScore';

const EquipmentCard = ({ equipment }) => {
  return (
    <Link 
      to={`/dashboard/equipment/${equipment.id}`}
      className="block bg-background-card border border-border rounded-xl p-5 hover:border-accent-primary transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
           <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
             {equipment.name}
           </h3>
           <span className="text-xs font-mono text-text-secondary">{equipment.serialNumber}</span>
        </div>
        
        {/* Mini Score Preview */}
        <div className="scale-50 origin-top-right -mt-2 -mr-2">
            <TrustScore score={equipment.trustScore} />
        </div>
      </div>

      <div className="space-y-2 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-text-muted" />
            <span>{equipment.category}</span>
        </div>
        <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-text-muted" />
            <span>{equipment.location}</span>
        </div>
        <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-text-muted" />
            <span className={equipment.status === 'Active' ? 'text-accent-success' : 'text-accent-danger'}>
                {equipment.status}
            </span>
        </div>
      </div>
    </Link>
  );
};

export default EquipmentCard;
