const router = require('express').Router();

let challenge = {
  title: 'Trading Challenge',
  virtualCapital: 1000000,
  started: false,
  score: 0,
  trades: 0
};

router.get('/', (req, res) => res.json(challenge));

router.post('/start', (req, res) => {
  challenge.started = true;
  res.json(challenge);
});

router.post('/trade', (req, res) => {
  challenge.trades += 1;
  if (typeof req.body.score === 'number') challenge.score += req.body.score;
  res.json(challenge);
});

module.exports = router;
