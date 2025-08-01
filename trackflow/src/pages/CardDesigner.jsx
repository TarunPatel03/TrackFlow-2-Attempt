import React, { useState } from 'react';
import './CardDesigner.css';
import Sidebar from '../components/Sidebar';
import FormField from '../components/Formfield';

const CardDesigner = () => {
  const [card, setCard] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    themeColor: '#3b82f6',
  });

  const handleChange = (e) => {
    setCard(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Card saved! (You can later connect this to Supabase)');
  };

  return (
    <div className="card-designer-page">
      <Sidebar />
      <main className="card-designer-main">
        <h1>Card Designer</h1>

        <form onSubmit={handleSubmit} className="card-form">
          <FormField name="name" label="Full Name" value={card.name} onChange={handleChange} required />
          <FormField name="title" label="Title" value={card.title} onChange={handleChange} required />
          <FormField name="email" label="Email" value={card.email} onChange={handleChange} />
          <FormField name="phone" label="Phone" value={card.phone} onChange={handleChange} />
          <div className="color-picker">
            <label>Theme Color</label>
            <input
              type="color"
              name="themeColor"
              value={card.themeColor}
              onChange={handleChange}
            />
          </div>
          <button className="save-btn" type="submit">Save Card</button>
        </form>

        <h2 className="preview-label">Live Preview</h2>
        <div className="card-preview" style={{ borderColor: card.themeColor }}>
          <h2 style={{ color: card.themeColor }}>{card.name}</h2>
          <p>{card.title}</p>
          <p>{card.phone}</p>
          <p>{card.email}</p>
        </div>
      </main>
    </div>
  );
};

export default CardDesigner;
