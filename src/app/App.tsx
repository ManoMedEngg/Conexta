// Main App component for Conexta Medical IoT Platform

// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import '../i18n'; // Import i18n configuration

// Pages
import { Login as LoginPage } from '../views/Login';
import { DoctorDashboard } from '../views/DoctorDashboard';
import { PatientDashboard } from '../views/PatientDashboard';
import { EngineerDashboard } from '../views/EngineerDashboard';
import { VendorDashboard } from '../views/VendorDashboard';

function AppContent() {
  const { user } = useAuth();
  // const { i18n } = useTranslation();
  // useEffect(() => {
  //   // Handle language changes if needed globally
  // }, [i18n.language]);

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!user) return <LoginPage />;

    switch (user.role) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientDashboard />;
      case 'engineer':
        return <EngineerDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {renderDashboard()}
    </div>
  );
}

import { HashRouter } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
}