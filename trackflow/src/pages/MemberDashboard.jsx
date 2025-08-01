import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import './MemberDashboard.css';

const MemberDashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error fetching user:', userError.message);
        return;
      }

      setUser(userData?.user);

      if (userData?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();

        if (!profileError) {
          setProfile(profileData);
        } else {
          console.error('Error fetching profile:', profileError.message);
        }
      }
    };

    fetchUserAndProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="member-dashboard-page">
        <h1>👋 Welcome, {user?.email}</h1>
        <p>Role: {profile?.role || 'member'}</p>
        <div className="member-dashboard-content">
          <p>This is your personalized member dashboard.</p>
          {/* Add events, card preview, or community sections here */}
        </div>
      </div>
    </>
  );
};

export default MemberDashboard;
