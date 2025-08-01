import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import './Inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role === 'admin') setIsAdmin(true);

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) {
        console.error('Error loading inventory:', error.message);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    };

    fetchInventory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="inventory-page">
        <h1>📁 Inventory</h1>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Last Updated</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock_quantity}</td>
                <td>
                  {item.last_updated
                    ? new Date(item.last_updated).toLocaleDateString()
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

export default Inventory;
