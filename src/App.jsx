import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './views/Login';
import { DoctorDashboard } from './views/DoctorDashboard';
import { PatientDashboard } from './views/PatientDashboard';
import { EngineerDashboard } from './views/EngineerDashboard';
import { VendorDashboard } from './views/VendorDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or loading spinner
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />; // Simple unauthorized redirect

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/engineer"
        element={
          <ProtectedRoute role="engineer">
            <EngineerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
