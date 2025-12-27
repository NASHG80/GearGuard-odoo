import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import RequestsPage from './pages/RequestsPage';
import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';

// Placeholder components for routes we haven't built yet
const Placeholder = ({ title }) => (
  <div className="p-8 text-center text-text-secondary">
    <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
    <p>This module is under construction.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="equipment" element={<EquipmentPage />} />
          <Route path="equipment/:id" element={<EquipmentDetailPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="teams" element={<Placeholder title="Maintenance Teams" />} />
          <Route path="settings" element={<Placeholder title="System Settings" />} />
        </Route>

        {/* Catch all - redirect to Landing or Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
