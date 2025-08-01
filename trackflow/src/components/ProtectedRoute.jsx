import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth check failed:', error.message);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!data.session);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null; // or a spinner/loading screen
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
