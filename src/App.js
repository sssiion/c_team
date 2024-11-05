// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [userId, setUserId] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { userId });
      const { data } = response;

      // 사용자 상태를 로컬 저장소에 저장
      if (data.newUser) {
        localStorage.setItem('gameState', JSON.stringify({}));
        alert('New user created. Starting a new game.');
      } else {
        localStorage.setItem('gameState', JSON.stringify(data.gameState));
        alert('Welcome back! Resuming your game.');
      }

      // WebGL 페이지로 이동
      window.location.href = '/webgl';
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLogin}>Next</button>
    </div>
  );
};

export default App;
