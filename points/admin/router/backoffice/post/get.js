const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  const id = req.params.id;

  db.post.findById(id)
  .then((post) => {
    if (!post) {
      throw new errors.NotFound('Post not found');
    }
    res.locals.query = Object.keys(req.query).map(key => (`${key}=${req.query[key]}`)).join('&');
    res.render('post', { post });
  })
  .catch(err => next(err));
};
