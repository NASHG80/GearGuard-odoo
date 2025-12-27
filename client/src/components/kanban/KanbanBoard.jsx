import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import RequestCard from './RequestCard';

const KanbanBoard = ({ initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    // If dropped on a column container (which has ID = status)
    // OR if dropped on a card, we find the column it belongs to.
    
    // Simple logic: If we drop over a column, update status.
    // Ideally we also handle re-ordering within column, but for MVP we focus on status change.
    
    // In this simplified version, the 'over' ID corresponds to the Droppable ID of the column
    if (['NEW', 'IN_PROGRESS', 'REPAIRED', 'SCRAP'].includes(over.id)) {
        setRequests((items) =>
            items.map((item) =>
                item.id === activeId ? { ...item, status: over.id } : item
            )
        );
    }

    setActiveId(null);
  };

  const activeRequest = activeId ? requests.find((r) => r.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-[calc(100vh-200px)] overflow-x-auto pb-4">
        {['NEW', 'IN_PROGRESS', 'REPAIRED', 'SCRAP'].map((status) => (
            <KanbanColumn 
                key={status} 
                id={status} 
                requests={requests.filter(r => r.status === status)} 
            />
        ))}
      </div>

      <DragOverlay>
        {activeRequest ? <RequestCard request={activeRequest} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
