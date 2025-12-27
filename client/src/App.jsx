import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';

import RequestsPage from './pages/RequestsPage';
import RequestDetailPage from './pages/RequestDetailPage'; // ✅ REQUIRED

import CreateRequestPage from './pages/CreateRequestPage';

import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import CreateEquipmentPage from './pages/CreateEquipmentPage';

import MaintenanceTeamsPage from './pages/MaintenanceTeamsPage';
import CalendarView from './pages/CalendarView';
import ReportingPage from './pages/ReportingPage';
import WorkCentersPage from './pages/WorkCentersPage';
import CreateWorkCenterPage from './pages/CreateWorkCenterPage';

// Placeholder for unfinished modules
const Placeholder = ({ title }) => (
  <div className="p-8 text-center text-text-secondary">
    <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
    <p>This module is under construction.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#161B22',
              color: '#E6EDF3',
              border: '1px solid #1F2937',
            },
          }}
        />

        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            {/* Requests */}
            <Route path="requests" element={<RequestsPage />} />
            <Route path="requests/:id" element={<RequestDetailPage />} /> {/* ✅ FIX */}

            <Route path="create-request" element={<CreateRequestPage />} />

            {/* Equipment */}
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="equipment/:id" element={<EquipmentDetailPage />} />
            <Route path="create-equipment" element={<CreateEquipmentPage />} />

            {/* Others */}
            <Route path="teams" element={<MaintenanceTeamsPage />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="reporting" element={<ReportingPage />} />
            <Route path="work-centers" element={<WorkCentersPage />} />
            <Route path="create-work-center" element={<CreateWorkCenterPage />} />

            <Route path="settings" element={<Placeholder title="System Settings" />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
