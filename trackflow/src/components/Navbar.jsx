import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">TrackFlow</Link>
        {!isAuthPage && (
          <nav className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        )}
      </div>
      <div className="navbar-right">
        {isAuthPage ? (
          <Link to="/">← Back to Home</Link>
        ) : (
          <>
            <Link to="/help">Help</Link>
            <Link to="/login" onClick={() => localStorage.clear()}>Log Out</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
