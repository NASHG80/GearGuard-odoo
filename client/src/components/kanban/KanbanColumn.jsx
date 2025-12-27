import { useDroppable } from '@dnd-kit/core';
import RequestCard from './RequestCard';

const statusLabels = {
  NEW: 'New Requests',
  IN_PROGRESS: 'In Progress',
  REPAIRED: 'Repaired / Closed',
  SCRAP: 'Scrap Review'
};

const statusColors = {
  NEW: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
  IN_PROGRESS: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
  REPAIRED: 'bg-green-500/10 border-green-500/20 text-green-500',
  SCRAP: 'bg-red-500/10 border-red-500/20 text-red-500',
};

const KanbanColumn = ({ id, requests }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex-1 min-w-[300px] flex flex-col h-full">
      <div className={`p-3 rounded-t-lg border-b-2 flex justify-between items-center ${statusColors[id] || 'bg-background-secondary'}`}>
        <h3 className="font-semibold">{statusLabels[id]}</h3>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-background-primary/50">
          {requests.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef} 
        className="flex-1 bg-background-secondary/30 p-3 space-y-3 rounded-b-lg border-x border-b border-border overflow-y-auto"
      >
        {requests.map((req) => (
          <RequestCard key={req.id} request={req} />
        ))}
        {requests.length === 0 && (
            <div className="h-20 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-text-muted text-sm">
                Drop here
            </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
