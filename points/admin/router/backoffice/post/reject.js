// const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  const id = req.body.postId;

  const postProm = db.post.findById(id);
  const adProm = db.ad.findOne({ where: { postId: id } });

  Promise.all([postProm, adProm])
  .then(([post, ad]) => {
    if (!post) {
      return res.json({ success: false, error: 'Post not found' });
    }

    const updatePost = post.update({
      status: 'rejected'
    }, {
      fields: ['status']
    });

    let deleteAd = {};
    if (ad) {
      deleteAd = ad.destroy();
    }

    return Promise.all([updatePost, deleteAd]);
  })
  .then(([post, ad]) => {
    return res.json({ success: true, error: '' });
  })
  .catch(err => next(err));
};
