const router = require('express').Router();

let notifications = [
  { id: 1, type: 'paper', title: 'Paper Trading Ready', message: 'Your virtual portfolio is ready.', read: false, createdAt: new Date().toISOString() },
  { id: 2, type: 'alert', title: 'Price Alert Demo', message: 'This is a sample price alert.', read: false, createdAt: new Date().toISOString() }
];

router.get('/', (req, res) => res.json(notifications));

router.post('/', (req, res) => {
  const item = { id: Date.now(), read: false, createdAt: new Date().toISOString(), ...req.body };
  notifications.unshift(item);
  res.status(201).json(item);
});

router.patch('/:id/read', (req, res) => {
  const item = notifications.find(n => n.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Notification not found' });
  item.read = true;
  res.json(item);
});

router.patch('/read-all', (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({ success: true });
});

module.exports = router;
