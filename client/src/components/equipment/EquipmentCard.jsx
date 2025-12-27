import { Link } from 'react-router-dom';
import { Settings, MapPin, Activity } from 'lucide-react';
import TrustScore from './TrustScore';

// Get or generate trust score from localStorage
const getTrustScore = (equipmentId) => {
  const cacheKey = `gearguard_trust_score_${equipmentId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    return parseInt(cached, 10);
  }
  
  // Generate random score between 20-99
  const randomScore = Math.floor(Math.random() * 80) + 20;
  localStorage.setItem(cacheKey, randomScore.toString());
  return randomScore;
};

const EquipmentCard = ({ equipment }) => {
  // Get cached or generate new trust score
  const trustScore = equipment.trustScore ?? getTrustScore(equipment.id);

  const getStatusColor = (score) => {
    if (score < 50) return 'border-error/50 shadow-error/10 hover:border-error hover:shadow-error/20';
    if (score < 80) return 'border-warning/50 shadow-warning/10 hover:border-warning hover:shadow-warning/20';
    return 'border-success/50 shadow-success/10 hover:border-success hover:shadow-success/20';
  };

  const statusClasses = getStatusColor(trustScore);

  return (
    <Link
      to={`/dashboard/equipment/${equipment.id}`}
      className={`block bg-background-card border rounded-xl p-5 transition-all duration-300 group shadow-lg ${statusClasses}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
            {equipment.name}
          </h3>
          <span className="text-xs font-mono text-text-secondary">{equipment.serialNumber}</span>
        </div>

        {/* Mini Score Preview */}
        <div className="scale-75 origin-top-right -mt-2 -mr-2">
          <TrustScore score={trustScore} />
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
