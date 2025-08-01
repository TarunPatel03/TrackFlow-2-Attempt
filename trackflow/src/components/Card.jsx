// /src/components/Card.jsx
import React from 'react';
import './Card.css';

const Card = ({ title, value, icon, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        {value && <p className="card-value">{value}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
