/* jshint esversion: 11, node: true */
// giftlink-backend/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./logger');
const connectDB = require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || '*';

// CORS setup
app.use(cors({
  origin: frontendUrl === '*' ? true : frontendUrl,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'GiftLink Sparkle API',
    message: 'A clean whimsical GiftLink build is running.'
  });
});

// API endpoints
app.use('/api/gifts', giftRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auths', authRoutes);

// Sentiment endpoint
app.get('/sentiment', (req, res) => {
  const text = (req.query.text || '').toLowerCase();
  let sentiment = 'neutral';

  if (text.includes('love') || text.includes('great') || text.includes('beautiful')) {
    sentiment = 'positive';
  } else if (text.includes('sad') || text.includes('bad') || text.includes('broken')) {
    sentiment = 'negative';
  }

  res.status(200).json({ sentiment });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  });
});

// Start server ONLY after DB is connected
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      logger.info(`GiftLink backend listening on port ${port}`);
    });
  } catch (err) {
    logger.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();
