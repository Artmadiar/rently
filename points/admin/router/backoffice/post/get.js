const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  const id = req.params.id;

  const postProm = db.post.findById(id);
  const adProm = db.ad.findOne({
    where: { postId: id },
    include: { model: db.district },
  });

  const languageProm = db.language.findAll();
  const adTypeProm = db.adType.findAll();
  const cityProm = db.city.findAll({ include: { model: db.district } });
  const flatTypeProm = db.flatType.findAll();

  Promise.all([postProm, adProm, languageProm, adTypeProm, cityProm, flatTypeProm])
  .then(([post, ad, languages, adTypes, cities, flatTypes]) => {
    if (!post) {
      throw new errors.NotFound('Post not found');
    }
    const statuses = db.post.tableAttributes.status.values;

    let district = '';
    // if there is no ad - make ad as empty object - cause we need it for calling properties
    if (!ad) {
      ad = {};
    } else {
      // set district name
      district = ad.district.nameCZ;
    }

    res.render('post', { post, ad, district, adTypes, cities, flatTypes, statuses, languages });
  })
  .catch(err => next(err));
};
