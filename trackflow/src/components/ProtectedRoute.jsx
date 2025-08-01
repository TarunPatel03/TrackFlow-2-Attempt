// /src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';

const ProtectedRoute = ({ children }) => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
