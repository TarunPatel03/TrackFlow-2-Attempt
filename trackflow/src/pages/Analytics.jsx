
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Analytics = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchOrderCount = async () => {
      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching analytics:', error);
      } else {
        setCount(count);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className="page">
      <h2>Analytics Page</h2>
      <p>Total orders: {count !== null ? count : 'Loading...'}</p>
    </div>
  );
};

export default Analytics;