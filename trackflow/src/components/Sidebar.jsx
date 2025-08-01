// /src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/orders', label: 'Orders' },
    { to: '/events', label: 'Events' },
    { to: '/directory', label: 'Directory' },
    { to: '/content-library', label: 'Content Library' },
    { to: '/payments', label: 'Payments' },
    { to: '/analytics', label: 'Analytics' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">TrackFlow</div>
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
