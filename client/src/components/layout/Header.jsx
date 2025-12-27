import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import MaintenanceRequestForm from '../forms/MaintenanceRequestForm';

const Header = ({ title = "Dashboard" }) => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-background-primary/50 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="bg-background-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors w-64"
            />
          </div>

          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-danger rounded-full border-2 border-background-primary"></span>
          </button>

          <Button size="sm" variant="primary" onClick={() => setIsRequestModalOpen(true)}>
            + New Request
          </Button>
        </div>
      </header>

      <Modal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
        title="Create Maintenance Request"
      >
         <MaintenanceRequestForm 
            onSubmit={() => {
                alert('Request Created!'); // Placeholder
                setIsRequestModalOpen(false);
            }} 
            onCancel={() => setIsRequestModalOpen(false)} 
         />
      </Modal>
    </>
  );
};

export default Header;
