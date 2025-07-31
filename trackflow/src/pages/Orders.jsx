import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page">
      <h2>Orders Page</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>{order.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
