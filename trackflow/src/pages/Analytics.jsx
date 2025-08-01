// /src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import './Analytics.css';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalMembers: 0,
    activeItems: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Simulated/fake stats — replace with Supabase queries
      setStats({
        totalOrders: 248,
        totalRevenue: 18240,
        totalMembers: 112,
        activeItems: 91,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="analytics-page">
      <Sidebar />
      <main className="analytics-main">
        <h1>Analytics</h1>
        <div className="analytics-grid">
          <Card title="Total Orders" value={stats.totalOrders} />
          <Card title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} />
          <Card title="Total Members" value={stats.totalMembers} />
          <Card title="Active Inventory Items" value={stats.activeItems} />
        </div>

        <div className="chart-placeholder">
          <p>📊 Charts coming soon — bar, pie, line, etc.</p>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
