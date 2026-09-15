const router = require('express').Router();

const portfolio = {
  currency: 'INR',
  value: 1036482,
  invested: 892300,
  available: 107700,
  todayPnL: 4820,
  totalPnL: 36482,
  holdings: []
};

router.get('/', (req, res) => res.json(portfolio));
module.exports = router;
