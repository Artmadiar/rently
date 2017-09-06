const router = require('express').Router();

router.get('/:id', (req, res, next) => {
  // const db = req.db;
  res.render('detail', {
    title: 'Detail',
  });
});

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
