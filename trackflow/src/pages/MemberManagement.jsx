// /src/pages/MemberManagement.jsx
import React, { useEffect, useState } from 'react';
import './MemberManagement.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching members:', error);
    else setMembers(data);
  };

  return (
    <div className="member-management-page">
      <Sidebar />
      <main className="member-management-main">
        <h1>Member Management</h1>
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.full_name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>{new Date(member.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="4">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MemberManagement;
