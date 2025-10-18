import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the message from backend
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchFromBackend();
  }, []);

  const fetchFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // IMPORTANT: Use 'backend' as hostname instead of 'localhost'
      // This is the service name defined in docker-compose.yml
      // Docker Compose creates a network where containers can communicate
      // using their service names as hostnames
      const response = await fetch('http://backend:8000/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error('Error fetching from backend:', err);
      setError(`Failed to connect to backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">🐳 Docker Learning Project</h1>
        <p className="subtitle">Frontend ↔ Backend Communication</p>
        
        <div className="content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Connecting to backend...</p>
            </div>
          )}
          
          {error && (
            <div className="error">
              <p>❌ {error}</p>
              <button onClick={fetchFromBackend} className="retry-btn">
                Retry Connection
              </button>
            </div>
          )}
          
          {message && !loading && !error && (
            <div className="success">
              <h2 className="message">{message}</h2>
              <p className="info">
                ✅ Successfully fetched from backend container!
              </p>
              <button onClick={fetchFromBackend} className="refresh-btn">
                Refresh Message
              </button>
            </div>
          )}
        </div>
        
        <div className="footer">
          <p>Frontend running on port 3000 | Backend running on port 8000</p>
        </div>
      </div>
    </div>
  );
}

export default App;
