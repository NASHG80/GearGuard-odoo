import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import MaintenanceRequestForm from '../forms/MaintenanceRequestForm';

const Header = ({ title = "Dashboard" }) => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <>
      <header className="h-20 border-b border-white/5 bg-background-primary/30 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-text-secondary hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
            <input
              type="text"
              placeholder="Search assets, teams..."
              className="glass-input w-64 pl-10 pr-4 py-2.5 rounded-xl text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full shadow-[0_0_8px_#EF4444] animate-pulse"></span>
            </button>

            <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

            {/* <Button size="sm" variant="primary" onClick={() => setIsRequestModalOpen(true)} className="shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-shadow">
              + New Request
            </Button> */}
          </div>
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
