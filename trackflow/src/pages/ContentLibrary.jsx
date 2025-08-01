// /src/pages/ContentLibrary.jsx
import React, { useEffect, useState } from 'react';
import './ContentLibrary.css';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';

const ContentLibrary = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('content_library')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching content:', error);
    else setResources(data);
  };

  return (
    <div className="content-library-page">
      <Sidebar />
      <main className="content-library-main">
        <h1>Content Library</h1>
        <div className="resource-grid">
          {resources.length === 0 ? (
            <p>No content available.</p>
          ) : (
            resources.map(resource => (
              <div key={resource.id} className="resource-card">
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <a
                  className="download-btn"
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ContentLibrary;
