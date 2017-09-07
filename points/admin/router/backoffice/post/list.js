const moment = require('moment');

module.exports = (req, res, next) => {
  const db = req.db;
  const page = parseInt(req.query.page, 10) || 1;
  const countPerPage = 20;

  return db.post.count()
  .then((count) => {
    // pagination
    res.locals.pages = Math.round(count / countPerPage);
    res.locals.page = page;

    // get all posts
    return db.post.findAll({
      limit: countPerPage,
      offset: (page - 1) * countPerPage,
      order: [['extCreatedTime', 'DESC']],
      include: [{
        model: db.extUser,
      }, {
        model: db.postAttachment,
      }],
    });
  })
  .then((posts) => {
    res.locals.moment = moment;
    res.locals.query = Object.keys(req.query).map(key => (`${key}=${req.query[key]}`)).join('&');
    res.render('posts', { posts });
  })
  .catch(err => next(err));
};
