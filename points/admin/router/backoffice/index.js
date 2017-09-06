const router = require('express').Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('express-flash');
const errors = require('../../../../libs/errors');
const auth = require('../../../../libs/auth/passportLocal');

const redisStoreConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  logErrors: true,
};

router.use(cookieParser());
router.use(session({
  store: new RedisStore(redisStoreConfig),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

router.use((req, res, next) => {
  if (!req.session) {
    throw new errors.SessionError();
  }
  next();
});

router.use(flash());

router.use(auth.passport.initialize());
router.use(auth.passport.session());

// Set user returned from passport.deserializeUser
router.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/**
 * Controllers
 */
const userCtrl = require('./user');
const postCtrl = require('./post');

/**
 * Backoffice routes
 */
router.get('/login', userCtrl.getLogin);
router.post('/login', userCtrl.postLogin);

router.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  req.session.returnTo = req.originalUrl;
  next();
});

// only authorized
router.use(auth.isAuthenticated);

router.use('/posts', postCtrl);
router.get('/logout', userCtrl.logout);

// redirect
router.get('/', (req, res) => res.redirect(`${req.baseUrl}/posts`));

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
