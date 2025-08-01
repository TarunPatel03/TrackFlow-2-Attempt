import React, { useEffect, useState } from 'react';
import './ProfileSettings.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';
import FormField from '../components/Formfield';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: user } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.user?.id)
      .single();

    if (!error) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data: user } = await supabase.auth.getUser();
    const updates = {
      ...profile,
      id: user?.user?.id,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) setMessage('Error updating profile.');
    else setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-settings-page">
      <Sidebar />
      <main className="profile-settings-main">
        <h1>Profile Settings</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="profile-form">
            <FormField
              label="Full Name"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              placeholder="John Doe"
            />
            <FormField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
            />
            <FormField
              label="Avatar URL"
              name="avatar_url"
              value={profile.avatar_url}
              onChange={handleChange}
              placeholder="https://..."
            />
            {message && <p className="update-message">{message}</p>}
            <button type="submit" className="update-btn">Save Changes</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default ProfileSettings;
