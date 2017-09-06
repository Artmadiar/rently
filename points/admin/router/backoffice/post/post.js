const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  const id = req.params.id;

  db.post.findById(id)
  .then((post) => {
    if (!post) {
      throw new errors.NotFound('Post not found');
    }
    req.flash('success', { msg: 'Post was successfully saved.' });
    return res.redirect(`${req.baseUrl}/backoffice/posts/${id}`);
  })
  .catch(err => next(err));
};
