// /src/pages/CommsCenter.jsx
import React, { useEffect, useState } from 'react';
import './CommsCenter.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const CommsCenter = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching messages:', error);
    else setMessages(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('announcements').insert([
      { content: newMessage }
    ]);

    if (error) {
      console.error('Error posting message:', error);
    } else {
      setNewMessage('');
      fetchMessages();
    }
  };

  return (
    <div className="comms-page">
      <Sidebar />
      <main className="comms-main">
        <h1>Communication Center</h1>
        <form onSubmit={handleSubmit} className="comms-form">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Post a message to your team..."
          ></textarea>
          <button type="submit">Send</button>
        </form>

        <div className="messages-list">
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="message-item">
                <p>{msg.content}</p>
                <span>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CommsCenter;
