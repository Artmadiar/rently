const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  // const id = req.params.id;

  // db.post.findById(id)
  // .then((post) => {
  //   if (!post) {
  //     throw new errors.NotFound('Post not found');
  //   }
    // req.flash('success', { msg: 'Post was successfully saved.' });
    // const query = Object.keys(req.query).map(key => (`${key}=${req.query[key]}`)).join('&');
    // return res.redirect(`${req.baseUrl}?${query}`);
  return res.json({ success: true, error: '' });
  // })
  // .catch(err => next(err));
};
