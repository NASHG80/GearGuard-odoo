import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock, AlertTriangle, PenTool, User } from 'lucide-react';

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

      <h4 className="font-medium text-text-primary mb-1 line-clamp-2">{request.subject}</h4>
      <p className="text-sm text-text-secondary mb-3">{request.equipmentName}</p>

      <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
        <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{request.technician || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{request.estimatedDuration}h</span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
