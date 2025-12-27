import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import RequestsPage from './pages/RequestsPage';
import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import MaintenanceTeamsPage from './pages/MaintenanceTeamsPage';
import CalendarView from './pages/CalendarView';
import ReportingPage from './pages/ReportingPage';

// Placeholder components for routes we haven't built yet
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
            success: {
              iconTheme: {
                primary: '#22C55E',
                secondary: '#161B22',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#161B22',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Dashboard Routes with Layout */}
          <Route path="/dashboard" element={
            // <ProtectedRoute>
              <DashboardLayout />
            // </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="equipment/:id" element={<EquipmentDetailPage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="teams" element={<MaintenanceTeamsPage />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="reporting" element={<ReportingPage />} />
            <Route path="settings" element={<Placeholder title="System Settings" />} />
          </Route>

          {/* Catch all - redirect to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
