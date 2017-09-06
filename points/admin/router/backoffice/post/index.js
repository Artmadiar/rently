const router = require('express').Router();

router.get('/', require('./list'));
router.get('/:id', require('./get'));
router.post('/:id', require('./post'));

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
