module.exports.getSearch = (req, res, next) => {
  // const db = req.db;
  res.render('search', {
    title: 'Search results',
  });
};
