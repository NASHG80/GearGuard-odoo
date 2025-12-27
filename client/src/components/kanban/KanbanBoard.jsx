import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const STATUS_MAP = {
  "New Requests": "NEW",
  "In Progress": "IN_PROGRESS",
  "Repaired / Closed": "COMPLETED",
  "Scrap Review": "CANCELLED",
};

const KanbanBoard = ({ initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests);

  const grouped = {
    "New Requests": requests.filter(r => r.status === "NEW"),
    "In Progress": requests.filter(r => r.status === "IN_PROGRESS"),
    "Repaired / Closed": requests.filter(r => r.status === "COMPLETED"),
    "Scrap Review": requests.filter(r => r.status === "CANCELLED"),
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const requestId = result.draggableId.replace("REQ-", "");
    const newStatus = STATUS_MAP[result.destination.droppableId];

    /* Optimistic UI */
    setRequests(prev =>
      prev.map(r =>
        r.id === `REQ-${requestId}` ? { ...r, status: newStatus } : r
      )
    );

    /* Persist to DB */
    const res = await fetch(
      `http://localhost:5000/api/requests/${requestId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!res.ok) {
      console.error("Failed to update status");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-6">
        {Object.entries(grouped).map(([column, items]) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-black/40 rounded-xl p-4 min-h-[500px]"
              >
                <h3 className="text-white font-bold mb-4">{column}</h3>

                {items.map((req, index) => (
                  <Draggable
                    key={req.id}
                    draggableId={req.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-[#161B22] p-4 mb-3 rounded-lg border border-white/10"
                      >
                        <h4 className="text-white font-semibold">{req.subject}</h4>
                        <p className="text-sm text-gray-400">
                          Technician: {req.technician}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
