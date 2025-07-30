// src/App.js

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import DeviceDashboard from './components/DeviceDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setJwtToken(data.token); // Assumes backend returns { token: '...' }
      setIsAuthenticated(true);
    } catch (err) {
      alert('Login error: ' + err.message);
    }
  };

  const handleLogout = () => {
    setJwtToken('');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {isAuthenticated ? (
        <DeviceDashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

