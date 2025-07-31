import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        return;
      }

      setSession(session);
    };

    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!session) {
    return <div className="dashboard-main">Not authorized</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>📦 TrackFlow</h2>
        <nav>
          <a href="/dashboard">📊 Dashboard</a>
          <a href="/orders">📦 Orders</a>
          <a href="/inventory">📁 Inventory</a>
          <a href="/reports">📈 Reports</a>
          <a href="/settings">⚙️ Settings</a>
        </nav>
        <div className="logout" onClick={handleLogout}>
          🔓 Logout
        </div>
      </aside>

      {/* Main Panel */}
      <main className="dashboard-main">
        <header className="stats-header">
          <div className="stat-card">
            <h3>32</h3>
            <p>Open Orders</p>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <p>Orders in Progress</p>
          </div>
          <div className="stat-card">
            <h3>210</h3>
            <p>Shipped Others</p>
          </div>
          <div className="stat-card">
            <h3>8,320</h3>
            <p>Total Orders</p>
          </div>
          <button className="new-order-btn">+ New Order</button>
        </header>

        <div className="orders-section">
          <input className="search-input" placeholder="🔍 Search..." />

          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1001,
                  status: "In Progress",
                  customer: "Acme Corp",
                  date: "Mar 3, 2024",
                  amount: "$24,500.00",
                },
                {
                  id: 1002,
                  status: "Shipped",
                  customer: "Globex Corp",
                  date: "Mar 23, 2024",
                  amount: "$12,500.00",
                },
              ].map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>✏️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
