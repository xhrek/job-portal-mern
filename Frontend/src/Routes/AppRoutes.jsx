import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Layout
import MainLayout from '../layouts/MainLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import SavedJobs from '../pages/SavedJobs';
import MyApplication from '../pages/MyApplication';
import JobDetails from '../pages/JobDetails';

import CandidateDashboard from '../pages/CandidateDashboard';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import CreateJob from '../pages/CreateJob';
import JobApplicants from '../pages/JobApplicants';
import Companies from '../pages/Companies';
import CreateCompany from '../pages/CreateCompany';

import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-8 text-white min-h-screen bg-slate-950 flex items-center justify-center">Loading authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route element={<MainLayout />}>
          
          {/* Public Routing Infrastructure */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Shared Authenticated Profile Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['Candidate', 'Recruiter', 'Admin']}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute allowedRoles={['Candidate', 'Recruiter', 'Admin']}>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          {/* Candidate Dashboard & Tracking Operations */}
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute allowedRoles={['Candidate']}>
                <SavedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute allowedRoles={['Candidate']}>
                <MyApplication />
              </ProtectedRoute>
            }
          />

          {/* Recruiter Workspace & Management Routes */}
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Recruiter']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/create"
            element={
              <ProtectedRoute allowedRoles={['Recruiter']}>
                <CreateJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:id/applicants"
            element={
              <ProtectedRoute allowedRoles={['Recruiter']}>
                <JobApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/companies"
            element={
              <ProtectedRoute allowedRoles={['Recruiter']}>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/companies/create"
            element={
              <ProtectedRoute allowedRoles={['Recruiter']}>
                <CreateCompany />
              </ProtectedRoute>
            }
          />

          {/* Administrative Management Panels */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Global Fallback Route (404 Handling via redirection) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}