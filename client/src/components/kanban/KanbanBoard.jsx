import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { User, Wrench, Factory } from "lucide-react";

const STATUS_MAP = {
  "New Requests": "NEW",
  "In Progress": "IN_PROGRESS",
  "Repaired / Closed": "COMPLETED",
  "Scrap Review": "CANCELLED",
};

const COLUMN_COLORS = {
  "New Requests": {
    bg: "bg-blue-500/20",
    border: "border-blue-500",
    text: "text-blue-400",
    count: "bg-blue-500",
  },
  "In Progress": {
    bg: "bg-yellow-500/20",
    border: "border-yellow-500",
    text: "text-yellow-400",
    count: "bg-yellow-500",
  },
  "Repaired / Closed": {
    bg: "bg-green-500/20",
    border: "border-green-500",
    text: "text-green-400",
    count: "bg-green-500",
  },
  "Scrap Review": {
    bg: "bg-red-500/20",
    border: "border-red-500",
    text: "text-red-400",
    count: "bg-red-500",
  },
};

const PRIORITY_COLORS = {
  HIGH: "border-l-red-500",
  MEDIUM: "border-l-yellow-500",
  LOW: "border-l-blue-500",
  DEFAULT: "border-l-gray-500",
};

const getPriorityBorder = (priority) => {
  const key = priority?.toUpperCase() || "DEFAULT";
  return PRIORITY_COLORS[key] || PRIORITY_COLORS.DEFAULT;
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

    // optimistic update
    setRequests(prev =>
      prev.map(r =>
        r.id === `REQ-${requestId}`
          ? { ...r, status: newStatus }
          : r
      )
    );

    try {
      const res = await fetch(
        `http://localhost:5000/api/requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("gearguard_token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Status update failed");
    } catch (err) {
      console.error(err);
      // rollback if DB fails
      setRequests(initialRequests);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(grouped).map(([columnName, items]) => {
          const colors = COLUMN_COLORS[columnName];

          return (
            <div key={columnName} className="flex flex-col">
              {/* Header */}
              <div
                className={`${colors.bg} border-t-4 ${colors.border} rounded-t-xl px-4 py-3 flex justify-between items-center`}
              >
                <h3 className={`${colors.text} font-bold text-sm uppercase`}>
                  {columnName}
                </h3>
                <span
                  className={`${colors.count} text-white text-xs font-bold px-2 py-1 rounded-full`}
                >
                  {items.length}
                </span>
              </div>

              {/* Column */}
              <Droppable droppableId={columnName}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-background-secondary/30 border border-white/10 border-t-0 rounded-b-xl p-3 min-h-[600px]
                      ${snapshot.isDraggingOver ? "bg-white/5" : ""}`}
                  >
                    {items.length === 0 && (
                      <div className="flex items-center justify-center h-32 text-text-muted text-sm">
                        Drop here
                      </div>
                    )}

                    {items.map((req, index) => (
                      <Draggable
                        key={req.id}
                        draggableId={req.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-[#161B22] border-l-4 ${getPriorityBorder(req.priority)}
                              border border-white/10 rounded-lg p-4 mb-3 transition-all
                              ${snapshot.isDragging ? "shadow-2xl scale-105" : ""}`}
                          >
                            {/* Header */}
                            <div className="flex justify-between mb-2">
                              <span className="text-xs font-mono text-text-muted">
                                {req.id}
                              </span>
                              <span className="text-xs font-bold text-accent-primary">
                                {req.priority?.toUpperCase() || "LOW"}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-white font-bold mb-3">
                              {req.subject}
                            </h4>

                            {/* Meta */}
                            <div className="space-y-1 text-sm text-text-secondary">
                              <div className="flex gap-2">
                                <User className="w-4 h-4" />
                                {req.employee || "N/A"}
                              </div>
                              <div className="flex gap-2">
                                <Wrench className="w-4 h-4" />
                                {req.technician || "Unassigned"}
                              </div>
                              <div className="flex gap-2 text-xs text-text-muted">
                                <Factory className="w-3 h-3" />
                                {req.company || "GearGuard Industries"}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
