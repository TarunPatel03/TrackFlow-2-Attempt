// /src/pages/MemberDashboard.jsx
import React from 'react';
import './MemberDashboard.css';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

const MemberDashboard = () => {
  return (
    <div className="member-dashboard">
      <Sidebar />
      <main className="member-main">
        <h1>Member Dashboard</h1>
        <div className="card-grid">
          <Card title="My Digital Card" value="View / Edit" />
          <Card title="Upcoming Events" value="3 Registered" />
          <Card title="Messages" value="2 New" />
          <Card title="Community Directory" value="Browse" />
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;
