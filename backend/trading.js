const router = require('express').Router();

let orders = [];
let nextOrderId = 1;

const demoPrices = {
  TATAMOTORS: 1000,
  RELIANCE: 1400,
  INFY: 1600,
  SBIN: 800,
  HDFCBANK: 1700
};

function getPrice(symbol) {
  const key = String(symbol || '').trim().toUpperCase();
  return demoPrices[key] || 100;
}

function createOrder(req, res, side) {
  const symbol = String(req.body.symbol || '').trim().toUpperCase();
  const quantity = Number(req.body.quantity);

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: 'Quantity must be a positive whole number'
    });
  }

  const price = getPrice(symbol);

  const order = {
    id: nextOrderId++,
    symbol,
    side,
    quantity,
    price,
    status: 'FILLED',
    mode: 'PAPER',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message:
      side === 'BUY'
        ? 'Paper buy order completed'
        : 'Paper sell order completed',
    order
  });
}

router.get('/', (req, res) => {
  res.json({
    app: 'TradeGuru Trading API',
    mode: 'PAPER',
    status: 'ready',
    supportedSides: ['BUY', 'SELL']
  });
});

router.get('/orders', (req, res) => {
  res.json({
    mode: 'PAPER',
    count: orders.length,
    orders
  });
});

router.get('/quote/:symbol', (req, res) => {
  const symbol = String(req.params.symbol || '').trim().toUpperCase();

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  res.json({
    symbol,
    price: getPrice(symbol),
    mode: 'PAPER'
  });
});

router.post('/buy', (req, res) => {
  createOrder(req, res, 'BUY');
});

router.post('/sell', (req, res) => {
  createOrder(req, res, 'SELL');
});

router.post('/order', (req, res) => {
  const side = String(req.body.side || '').trim().toUpperCase();

  if (side !== 'BUY' && side !== 'SELL') {
    return res.status(400).json({
      error: 'Side must be BUY or SELL'
    });
  }

  createOrder(req, res, side);
});

module.exports = router;
