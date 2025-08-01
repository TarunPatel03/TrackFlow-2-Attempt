// /src/pages/Payments.jsx
import React, { useEffect, useState } from 'react';
import './Payments.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching payments:', error);
    else setPayments(data);
  };

  return (
    <div className="payments-page">
      <Sidebar />
      <main className="payments-main">
        <h1>Payments</h1>
        <div className="payments-table">
          <table>
            <thead>
              <tr>
                <th>Payer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.payer}</td>
                  <td>${payment.amount}</td>
                  <td>
                    <span className={`status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.method}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Payments;
