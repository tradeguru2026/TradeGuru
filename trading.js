const router = require('express').Router();

let trading = {
  balance: 1000000,
  holdings: []
};

router.get('/', (req, res) => {
  res.json(trading);
});

router.post('/buy', (req, res) => {
  const { symbol, price, quantity } = req.body;

  if (!symbol || typeof price !== 'number' || typeof quantity !== 'number' || price <= 0 || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid trade details' });
  }

  const cost = price * quantity;

  if (cost > trading.balance) {
    return res.status(400).json({ error: 'Insufficient virtual balance' });
  }

  trading.balance -= cost;

  const existing = trading.holdings.find(x => x.symbol === symbol);

  if (existing) {
    existing.quantity += quantity;
  } else {
    trading.holdings.push({
      symbol,
      quantity,
      averagePrice: price
    });
  }

  res.json(trading);
});

router.post('/sell', (req, res) => {
  const { symbol, price, quantity } = req.body;

  if (!symbol || typeof price !== 'number' || typeof quantity !== 'number' || price <= 0 || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid trade details' });
  }

  const holding = trading.holdings.find(x => x.symbol === symbol);

  if (!holding || holding.quantity < quantity) {
    return res.status(400).json({ error: 'Insufficient holdings' });
  }

  trading.balance += price * quantity;
  holding.quantity -= quantity;

  if (holding.quantity === 0) {
    trading.holdings = trading.holdings.filter(x => x.symbol !== symbol);
  }

  res.json(trading);
});

module.exports = router;
