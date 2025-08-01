// /src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching orders:', error);
    else setOrders(data);
  };

  return (
    <div className="orders-page">
      <Sidebar />
      <main className="orders-main">
        <h1>Orders</h1>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.company}</td>
                  <td>{order.status}</td>
                  <td>${order.amount}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Orders;
