import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './lib/supabaseClient';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Public pages
import Home from './pages/Home';
import Signup from './pages/SignUp'; // ✅ Correct casing
import Login from './pages/Login';

// Protected pages (shown inside Layout with Navbar)
import Dashboard from './pages/Dashboard';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Events from './pages/Events';
import Directory from './pages/Directory';
import ProfileSettings from './pages/ProfileSettings';
import ContentLibrary from './pages/ContentLibrary';
import MemberManagement from './pages/MemberManagement';
import EventManagement from './pages/EventManagement';
import CardDesigner from './pages/CardDesigner';
import Payments from './pages/Payments';
import CommsCenter from './pages/CommsCenter';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import HelpCenter from './pages/HelpCenter';

const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with shared layout and navbar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/member-dashboard" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/content-library" element={<ProtectedRoute><ContentLibrary /></ProtectedRoute>} />
            <Route path="/member-management" element={<ProtectedRoute><MemberManagement /></ProtectedRoute>} />
            <Route path="/event-management" element={<ProtectedRoute><EventManagement /></ProtectedRoute>} />
            <Route path="/card-designer" element={<ProtectedRoute><CardDesigner /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/comms" element={<ProtectedRoute><CommsCenter /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SessionContextProvider>
  );
};

export default App;
