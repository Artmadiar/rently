const router = require('express').Router();

router.get('/', require('./list'));
router.get('/:id', require('./get'));
router.post('/approve', require('./approve'));
router.post('/reject', require('./reject'));

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
