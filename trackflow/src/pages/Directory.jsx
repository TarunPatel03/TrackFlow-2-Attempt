// /src/pages/Directory.jsx
import React, { useEffect, useState } from 'react';
import './Directory.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const Directory = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, avatar_url')
      .order('full_name', { ascending: true });

    if (error) console.error('Error fetching directory:', error);
    else setProfiles(data);
  };

  return (
    <div className="directory-page">
      <Sidebar />
      <main className="directory-main">
        <h1>Community Directory</h1>
        <div className="directory-grid">
          {profiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <img
                src={profile.avatar_url || '/vite.svg'}
                alt={profile.full_name}
                className="profile-avatar"
              />
              <div>
                <h2>{profile.full_name}</h2>
                <p>{profile.email}</p>
                <span className="role-tag">{profile.role}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Directory;
