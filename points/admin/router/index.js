const router = require('express').Router();
const bodyParser = require('body-parser');
const contentType = require('../middlewares/contentTypeValidator');
const db = require('../../../models');
const apiRouter = require('./api');
// const websiteRouter = require('./websiteRouter');

router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// Content type validation
router.use(contentType({
  types: ['application/json', 'application/x-www-form-urlencoded']
}));

router.use('/', (req, res, next) => {
  req.db = db();
  return next();
});

// router.use('/', websiteRouter);
router.use('/api', apiRouter);


router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
