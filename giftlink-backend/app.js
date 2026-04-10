/* jshint esversion: 11, node: true */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./logger');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || '*';

app.use(cors({ origin: frontendUrl === '*' ? true : frontendUrl, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).json({
    name: 'GiftLink Sparkle API',
    message: 'A clean whimsical GiftLink build is running.'
  });
});

app.use('/api/gifts', giftRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auths', authRoutes);

app.get('/sentiment', function (req, res) {
  const text = (req.query.text || '').toLowerCase();
  let sentiment = 'neutral';

  if (text.includes('love') || text.includes('great') || text.includes('beautiful')) {
    sentiment = 'positive';
  } else if (text.includes('sad') || text.includes('bad') || text.includes('broken')) {
    sentiment = 'negative';
  }

  res.status(200).json({ sentiment });
});

app.use(function (err, req, res, next) {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(port, function () {
  logger.info(`GiftLink backend listening on port ${port}`);
});
