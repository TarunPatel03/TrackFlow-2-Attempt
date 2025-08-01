import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData?.session?.user) {
        navigate('/login');
        return;
      }

      setUser(sessionData.session.user);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionData.session.user.id)
        .single();

      if (error || !profile || profile.role !== 'admin') {
        navigate('/dashboard');
      } else {
        setRole(profile.role);
      }
    };

    loadAdminData();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="admin-dashboard-page">
        <h1>🛠️ Admin Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        <p>Your role: {role}</p>
        <div className="admin-tools">
          <p>Use this dashboard to manage users, orders, and app settings.</p>
          {/* You can add admin widgets here */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
