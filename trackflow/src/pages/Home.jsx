// File: src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to TrackFlow</h1>
        <p>Where your operations and membership come together in one place.</p>
        <div className="cta-buttons">
          <button onClick={() => navigate("/signup")}>Join Now</button>
          <button onClick={() => navigate("/dashboard")}>Explore Dashboard</button>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>📣 Announcements</h3>
          <p>Stay up to date with the latest news and updates from your organization.</p>
        </div>
        <div className="feature-card">
          <h3>🎟️ Upcoming Events</h3>
          <p>Register, attend, and engage with community-hosted or private events.</p>
        </div>
        <div className="feature-card">
          <h3>💳 Member Benefits</h3>
          <p>Access exclusive content, discounts, and your personalized membership card.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
