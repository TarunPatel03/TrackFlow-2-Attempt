// /src/pages/Inventory.jsx
import React, { useEffect, useState } from 'react';
import './Inventory.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('name', { ascending: true });

    if (error) console.error('Error fetching inventory:', error);
    else setItems(data);
  };

  return (
    <div className="inventory-page">
      <Sidebar />
      <main className="inventory-main">
        <h1>Inventory</h1>
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>
                  <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
