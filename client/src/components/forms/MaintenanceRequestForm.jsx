import Button from '../ui/Button';

const MaintenanceRequestForm = ({ onSubmit, onCancel }) => {
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
        <input 
            type="text" 
            className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary"
            placeholder="e.g. Broken Conveyor Belt"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Equipment</label>
            <select className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary">
                <option>HP-2000 Hydraulic Press</option>
                <option>Server Rack Main</option>
                <option>CNC Milling M1</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Request Type</label>
            <select className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary">
                <option value="CORRECTIVE">Corrective (Breakdown)</option>
                <option value="PREVENTIVE">Preventive (Routine)</option>
            </select>
          </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Scheduled Date</label>
            <input 
                type="date"
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
            <select className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
            </select>
          </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
        <textarea 
            className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary h-24"
            placeholder="Describe the issue in detail..."
        ></textarea>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onCancel} type="button">Cancel</Button>
        <Button variant="primary" type="submit">Create Request</Button>
      </div>
    </form>
  );
};

export default MaintenanceRequestForm;
