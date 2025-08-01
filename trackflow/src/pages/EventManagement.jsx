import React, { useEffect, useState } from 'react';
import './EventManagement.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';
import FormField from '../components/Formfield';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (error) console.error(error);
    else setEvents(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('events').insert([formData]);

    if (error) {
      setMessage('Error creating event.');
    } else {
      setMessage('Event created!');
      setFormData({ name: '', location: '', date: '', description: '' });
      fetchEvents();
    }
  };

  return (
    <div className="event-management-page">
      <Sidebar />
      <main className="event-management-main">
        <h1>Event Management</h1>

        <form onSubmit={handleCreate} className="event-form">
          <FormField label="Event Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Location" name="location" value={formData.location} onChange={handleChange} required />
          <FormField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          <FormField label="Description" name="description" value={formData.description} onChange={handleChange} />
          <button type="submit" className="create-btn">Create Event</button>
          {message && <p className="feedback-msg">{message}</p>}
        </form>

        <div className="event-table">
          <h2>All Events</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="3">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EventManagement;
