const router = require('express').Router();

let watchlist = [
  { id: 1, symbol: 'TATAMOTORS', name: 'Tata Motors', price: 0 },
  { id: 2, symbol: 'RELIANCE', name: 'Reliance', price: 0 },
  { id: 3, symbol: 'INFY', name: 'Infosys', price: 0 }
];

router.get('/', (req, res) => res.json(watchlist));

router.post('/', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  watchlist.push(item);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = watchlist.length;
  watchlist = watchlist.filter(x => x.id !== id);
  if (before === watchlist.length) return res.status(404).json({ error: 'Watchlist item not found' });
  res.json({ success: true });
});

module.exports = router;
