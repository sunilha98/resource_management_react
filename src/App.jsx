import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SoWPage from './pages/SoWPage';
import ResourceAllocationPage from './pages/ResourceAllocationPage';
import ReportsPage from './pages/Reports';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LocationMasterPage from './pages/LocationMasterPage';
import UserManagementPage from './pages/UserManagementPage';
import Reports from './pages/Reports';
import BenchTrackingReport from './pages/reports/BenchTrackingReport';
import SpendTrackingReport from './pages/reports/SpendTrackingReport';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};


function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return isLoginPage ? (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <>
      <Header />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-white">
          <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute roles={["SUPER_ADMIN", "RMT", "PM"]}>
                <DashboardPage />
              </ProtectedRoute>
            } />
        <Route path="/masters/locations" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <LocationMasterPage />
        </ProtectedRoute>
        } />
        <Route path="/users" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <UserManagementPage />
        </ProtectedRoute>
        } />
            <Route path="/sow" element={
              <ProtectedRoute roles={["RMT"]}>
                <SoWPage />
              </ProtectedRoute>
            } />
            <Route path="/allocate" element={
              <ProtectedRoute roles={["RMT"]}>
                <ResourceAllocationPage />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute roles={["SUPER_ADMIN", "Finance Controllers"]}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
            <Route path="*" element={<Navigate to="/login" />} />
            
            <Route path="/reports/bench-tracking" element={<BenchTrackingReport />} />
            <Route path="/reports/spend-tracking" element={<SpendTrackingReport />} />

          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
