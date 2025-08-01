// /src/pages/Integrations.jsx
import React from 'react';
import './Integrations.css';
import Sidebar from '../components/Sidebar';

const Integrations = () => {
  const services = [
    { name: 'Slack', description: 'Send order notifications to your Slack channels.' },
    { name: 'Google Sheets', description: 'Sync orders and inventory to Google Sheets in real time.' },
    { name: 'Zapier', description: 'Automate workflows with over 5,000 connected apps.' },
    { name: 'Stripe', description: 'Enable payments and invoices inside your workspace.' },
  ];

  return (
    <div className="integrations-page">
      <Sidebar />
      <main className="integrations-main">
        <h1>Integrations</h1>
        <div className="integration-list">
          {services.map((service, idx) => (
            <div key={idx} className="integration-card">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <button>Connect</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Integrations;
