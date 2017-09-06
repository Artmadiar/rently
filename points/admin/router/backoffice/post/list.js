module.exports = (req, res, next) => {
  const db = req.db;

  return db.post.findAll({
    include: [{
      model: db.extUser,
    }, {
      model: db.postAttachment,
    }],
  })
  .then((posts) => {
    res.render('posts', { posts });
  })
  .catch(err => next(err));
};
