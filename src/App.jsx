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
import SowPage from './pages/SoWPage';
import CreateClientPage from './pages/CreateClientPage';
import ProjectListPage from './pages/ProjectListPage';
import ResourceMasterPage from './pages/ResourceMasterPage';
import FulfillmentTrackingPage from './pages/FulfillmentTrackingPage';
import FulfillmentRequestForm from './pages/FulfillmentRequestForm';
import ShiftCreationPage from './pages/ShiftCreationPage';
import ResourceReleasePage from './pages/ResourceReleasePage';
import ReleaseRequestsList from './pages/ReleaseRequestsList';
import LessonLearnedForm from './components/LessonLearnedForm';
import LessonsLearnedPage from './pages/LessonsLearnedPage';
import ProjectStatusPage from './pages/ProjectStatusPage';
import ProposedProjectsReport from './pages/reports/ProposedProjectsReport';
import RiskIssuesReport from './pages/reports/RisksIssuesReport';
import ResourceAllocationReport from './pages/reports/ResourceAllocationReport';
import ForecastingReport from './pages/reports/ForecastingReport';
import FinancialsMetricsReport from './pages/reports/FinancialMetricsReport';
import GovernanceReport from './pages/reports/GovernanceReport';
import PortfolioReport from './pages/reports/PortfolioDashboard';
import InFlightProjectsReport from './pages/reports/InFlightProjectsReport';
import LessonsLearnedReport from './pages/reports/LessonsLearnedReport';

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
      <div
        className="d-flex align-items-stretch"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        }}
      >
        <Sidebar />
        <main
          className="flex-grow-1 p-4 d-flex justify-content-center align-items-start"
          style={{ minHeight: '100vh' }}
        >
          <div
            className="w-100"
            style={{
              maxWidth: 1200,
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
              padding: 32,
              marginTop: 32,
              marginBottom: 32,
            }}
          >
            <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute roles={["SUPER_ADMIN", "RMT", "PROJECT_MANAGER"]}>
                <DashboardPage />
              </ProtectedRoute>
            } />
        <Route path="/masters/locations" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <LocationMasterPage />
        </ProtectedRoute>
        } />
        <Route path="/clients" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <CreateClientPage />
        </ProtectedRoute>
        } />
        <Route path="/masters/resources" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <ResourceMasterPage />
        </ProtectedRoute>
        } />
        <Route path="/shifts" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <ShiftCreationPage />
        </ProtectedRoute>
        } />
        <Route path="/users" element={
        <ProtectedRoute roles={['SUPER_ADMIN']}>
            <UserManagementPage />
        </ProtectedRoute>
        } />
            <Route path="/sow" element={
              <ProtectedRoute roles={["RMT"]}>
                <SowPage />
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
            <Route path="/reports/proposed" element={<ProposedProjectsReport />} />
            <Route path="/reports/project-status" element={<ProjectListPage />} />
            <Route path="/reports/risks-issues" element={<RiskIssuesReport />} />
            <Route path="/reports/resource-allocation" element={<ResourceAllocationReport />} />
            <Route path="/reports/forecasting" element={<ForecastingReport />} />
            <Route path="/reports/financial-metrics" element={<FinancialsMetricsReport />} />
            <Route path="/reports/governance" element={<GovernanceReport />} />
            <Route path="/reports/portfolio" element={<PortfolioReport />} />
            <Route path="/reports/lessons-learned" element={<LessonsLearnedReport />} />
            <Route path="/reports/in-flight" element={<InFlightProjectsReport />} />

            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/fulfillments" element={<FulfillmentTrackingPage />} />
            <Route path="/request-fulfillments" element={<FulfillmentRequestForm />} />
            <Route path="/resource-release" element={<ResourceReleasePage />} />
            <Route path="/release-requests" element={<ReleaseRequestsList />} />
            <Route path="/lessons" element={<LessonsLearnedPage />} />
            <Route path="/status-update" element={<ProjectStatusPage />} />

            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
