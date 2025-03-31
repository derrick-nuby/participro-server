const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { errorHandler } = require('./middleware/error.middleware');
const inferenceRoutes = require('./routes/inference.routes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://participro-ui.vercel.app',
    /http:\/\/localhost(:\d+)?/
  ]
}));
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/inference', inferenceRoutes);

// Root route to welcome people to the backend
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Backend</h1><p>This is the backend server for our application.</p>');
});

// API route to welcome people to the API
app.get('/api', (req, res) => {
  res.send('<h1>Welcome to the API</h1><p>Explore the available API endpoints for our application.</p>');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;