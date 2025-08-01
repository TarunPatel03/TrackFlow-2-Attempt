import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
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
      await fetchProfileRole(session.user.id);
      await fetchOrders();
    };

    init();
  }, []);

  const fetchProfileRole = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (!error && data?.role === "admin") {
      setIsAdmin(true);
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("order_id, status, item_name, last_updated")
      .order("last_updated", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error.message);
    } else {
      setOrders(data || []);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.item_name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filterStatus
      ? order.status?.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>📦 TrackFlow</h2>
        <nav>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/orders">📦 Orders</Link>
          <Link to="/inventory">📁 Inventory</Link>
          <Link to="/settings">⚙️ Settings</Link>
        </nav>
        <div className="logout" onClick={handleLogout}>
          🔓 Logout
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="stats-header">
          <div className="stat-card">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h3>
              {
                orders.filter((o) =>
                  ["open", "in progress", "pending"].includes(
                    o.status?.toLowerCase()
                  )
                ).length
              }
            </h3>
            <p>Active Orders</p>
          </div>
          <div className="stat-card">
            <h3>
              {
                orders.filter((o) =>
                  o.status?.toLowerCase().includes("shipped")
                ).length
              }
            </h3>
            <p>Shipped</p>
          </div>
          {isAdmin && (
            <button className="new-order-btn">+ New Order</button>
          )}
        </header>

        <div className="orders-section">
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              className="search-input"
              placeholder="🔍 Search item name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="search-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {[...new Set(orders.map((o) => o.status))].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Item</th>
                <th>Last Updated</th>
                <th>Amount</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    <span
                      className={`status ${order.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.item_name}</td>
                  <td>
                    {order.last_updated
                      ? new Date(order.last_updated).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>—</td>
                  {isAdmin && <td>✏️</td>}
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
