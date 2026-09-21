const express = require('express');
const cors = require('cors');

const notifications = require('./notifications');
const news = require('./news');
const watchlist = require('./watchlist');
const portfolio = require('./portfolio');
const challenge = require('./challenge');
const trading = require('./trading');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    app: 'TradeGuru API',
    status: 'running',
    version: '1.0.0'
  });
});

app.use('/api/notifications', notifications);
app.use('/api/news', news);
app.use('/api/watchlist', watchlist);
app.use('/api/portfolio', portfolio);
app.use('/api/challenge', challenge);
app.use('/api/trading', trading);

app.use((req, res) => {
  res.status(404).json({
    error: 'API route not found'
  });
});

app.listen(PORT, () => {
  console.log(`TradeGuru backend running at http://localhost:${PORT}`);
});
