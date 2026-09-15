const router = require('express').Router();

const news = [
  { id: 1, category: 'Markets', title: 'Market Update', summary: 'Sample market news for TradeGuru prototype.', source: 'TradeGuru Demo', createdAt: new Date().toISOString() },
  { id: 2, category: 'Stocks', title: 'Stock Watch', summary: 'Sample stock news. Live feed will be connected later.', source: 'TradeGuru Demo', createdAt: new Date().toISOString() },
  { id: 3, category: 'Learning', title: 'Trading Learning', summary: 'Learn risk management and disciplined trading.', source: 'TradeGuru', createdAt: new Date().toISOString() }
];

router.get('/', (req, res) => res.json(news));
module.exports = router;
