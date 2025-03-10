import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mlRoutes from './ml/routes/mlRoutes';
import { analyzeProperty } from './ml/services/gptService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3007;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/ml', mlRoutes);

// Start server
async function startServer() {
  try {
    app.listen(port, () => {
      console.log(`CIO API server running on port ${port}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
  }
}

startServer(); 