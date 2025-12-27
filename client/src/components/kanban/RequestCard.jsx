import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock, AlertTriangle, User, Briefcase, Building2 } from 'lucide-react';

const priorityColors = {
  LOW: 'border-l-4 border-l-blue-500',
  MEDIUM: 'border-l-4 border-l-yellow-500',
  HIGH: 'border-l-4 border-l-orange-500',
  CRITICAL: 'border-l-4 border-l-red-600',
};

const RequestCard = ({ request }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: request.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-background-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
        border border-border ${priorityColors[request.priority]}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono text-text-muted">{request.id}</span>
        {request.priority === 'CRITICAL' && (
          <AlertTriangle className="w-4 h-4 text-accent-danger" />
        )}
      </div>

      <h4 className="font-medium text-text-primary mb-3 line-clamp-2">{request.subject}</h4>

      <div className="space-y-2">
        {/* Employee */}
        <div className="flex items-center gap-2 text-xs">
          <User className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <span className="text-text-secondary">
            <span className="text-text-muted">Employee:</span> {request.employee || 'N/A'}
          </span>
        </div>

        {/* Technician */}
        <div className="flex items-center gap-2 text-xs">
          <Briefcase className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <span className="text-text-secondary">
            <span className="text-text-muted">Technician:</span> {request.technician || 'Unassigned'}
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text-secondary">
            <span className="text-text-muted">Category:</span> {request.category || 'N/A'}
          </span>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 text-xs">
          <Building2 className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <span className="text-text-secondary">
            {request.company || 'GearGuard Industries'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
