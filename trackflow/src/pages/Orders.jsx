import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error('No session found');
        return;
      }

      const { user } = session;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') setIsAdmin(true);

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error.message);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <h1>📦 All Orders</h1>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Item Name</th>
              <th>Last Updated</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.status}</td>
                <td>{order.item_name}</td>
                <td>
                  {order.last_updated
                    ? new Date(order.last_updated).toLocaleString()
                    : '—'}
                </td>
                {isAdmin && <td>✏️</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
