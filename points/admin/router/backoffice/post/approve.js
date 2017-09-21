// const errors = require('../../../../../libs/errors');

module.exports = (req, res, next) => {
  const db = req.db;
  const id = req.body.postId;

  // if there are cityId and district name
  // try to find district
  let findDistrictProm = Promise.resolve({});
  if (req.body.cityId && req.body.district) {
    findDistrictProm = db.district.findOne({
      where: {
        cityId: req.body.cityId,
        nameCZ: req.body.district,
      },
    });
  }

  findDistrictProm
  .then((district) => {
    let districtProm = Promise.resolve(district);

    // if we didn't find district - let's make it
    if (!district) {
      districtProm = db.district.create({
        cityId: req.body.cityId,
        nameCZ: req.body.district,
        nameEN: req.body.district,
        nameRU: req.body.district,
      });
    }
    // find post
    const postProm = db.post.findById(id);
    // find ad by postId
    const adProm = db.ad.findOne({ where: { postId: id } });

    return Promise.all([postProm, adProm, districtProm]);
  })
  .then(([post, ad, district]) => {
    if (!post) {
      return res.json({ success: false, error: 'Post not found' });
    }

    // post
    const updatePost = post.update({
      status: 'applied',
    }, {
      fields: ['status'],
    });

    // district
    req.body.districtId = district.id;

    // Ad
    let updateAd;
    if (ad) {
      updateAd = ad.update(req.body, {
        fields: ['languageId', 'adTypeId', 'cityId', 'districtId', 'zipCode', 'street', 'houseNumber', 'flatTypeId', 'price', 'comPayment', 'area', 'description'],
      });
    } else {
      updateAd = db.ad.create(req.body);
    }

    return Promise.all([updatePost, updateAd]);
  })
  .then(([post, ad]) => {
    return res.json({ success: true, error: '' });
  })
  .catch(err => next(err));
};
