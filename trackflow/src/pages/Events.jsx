// /src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import './Events.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) console.error('Error fetching events:', error);
    else setEvents(data);
  };

  return (
    <div className="events-page">
      <Sidebar />
      <main className="events-main">
        <h1>Events</h1>
        <div className="events-list">
          {events.length === 0 ? (
            <p>No events scheduled.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="event-card">
                <h2>{event.name}</h2>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Events;
