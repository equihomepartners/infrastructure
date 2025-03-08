const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// User management endpoints
app.get('/api/users', (req, res) => {
  res.json({ message: 'Users endpoint' });
});

// Platform configuration endpoints
app.get('/api/config', (req, res) => {
  res.json({ message: 'Platform configuration' });
});

app.listen(port, () => {
  console.log(`Platform API running on port ${port}`);
}); 