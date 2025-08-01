// /src/pages/HelpCenter.jsx
import React from 'react';
import './HelpCenter.css';
import Sidebar from '../components/Sidebar';

const HelpCenter = () => {
  return (
    <div className="help-center-page">
      <Sidebar />
      <main className="help-center-main">
        <h1>Help Center</h1>
        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <ul>
            <li><strong>How do I reset my password?</strong><br />You can reset your password via the login page using the "Forgot Password?" link.</li>
            <li><strong>How do I update inventory?</strong><br />Navigate to the Inventory tab and click the edit icon next to an item.</li>
            <li><strong>How do I invite a team member?</strong><br />Go to Member Management and use the "Invite Member" button (coming soon).</li>
            <li><strong>Need more help?</strong><br />Contact support at <a href="mailto:support@trackflow.app">support@trackflow.app</a>.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
