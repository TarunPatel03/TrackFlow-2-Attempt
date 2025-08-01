// /src/pages/AdminDashboard.jsx
import React from 'react';
import './AdminDashboard.css';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="admin-main">
        <h1>Admin Dashboard</h1>
        <div className="card-grid">
          <Card title="Total Members" value="147" />
          <Card title="Upcoming Events" value="5 Scheduled" />
          <Card title="Payments Received" value="$12,340" />
          <Card title="Active Users" value="38 Online" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
