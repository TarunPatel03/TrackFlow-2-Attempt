import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./Inventory.css";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("name, description, sku, quantity_in_stock, unit_price");

    if (error) {
      console.error("Error fetching items:", error.message);
    } else {
      setItems(data);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <div className="inventory-controls">
        <input
          className="inventory-search-input"
          placeholder="Search by item name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Quantity in Stock</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.sku}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.description}</td>
              <td>{item.quantity_in_stock}</td>
              <td>${item.unit_price?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
