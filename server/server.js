const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');
const app = express();
const PORT = 6000; //process.env.PORT || 6000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public','src','client')));

// Routes
app.post('/api/login', authController.login);
app.post('/api/saveGame', gameController.getGameState);
app.get('/api/loadGame', gameController.saveGameState);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'webgl.html'));
  });
  
  // WebGL 페이지 HTML 서빙
  app.get('/webgl', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'webgl.html'));
  });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
