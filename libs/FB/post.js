const moment = require('moment');

module.exports = class FBPost {
  /**
   * Constructor
   * @param {DB Conncetion} db
   * @param {Object} post
   */
  constructor(db, post) {
    if (!db) {
      throw new Error('DB Connection is required');
    }

    if (!post || !post.id) {
      throw new Error('Post data is required');
    }

    this.id = 0;
    this.new = true;
    
    this.db = db;

    this.source = 'fb';
    this.extId = post.id;
    this.extCreatedTime = moment(post.created_time).toDate();
    this.extUpdatedTime = moment(post.updated_time).toDate();
    this.type = post.type;
    this.caption = post.caption;
    this.text = post.message;
    this.extUserExtId = post.from.id;
    this.url = post.link || post.permalink_url;
    this.originText = JSON.stringify(post);
  }

  save() {
    const findPost = this.db.post.findOne({
      where: { source: 'fb', extId: this.extId },
    });
    const findExtUser = this.db.extUser.findOne({
      where: { source: 'fb', extId: this.extUserExtId },
    });

    return Promise.all([findPost, findExtUser])
    .then(([post, extUser]) => {
      if (!post) {
        return this.db.post.create({
          source: this.source,
          extId: this.extId,
          extCreatedTime: this.extCreatedTime,
          extUpdatedTime: this.extUpdatedTime,
          type: this.type,
          caption: this.caption,
          text: this.text,
          extUserId: extUser.id,
          url: this.url,
          originText: this.originText,
        });
      }

      return Promise.resolve(post);
    })
    .then((post) => {
      this.id = post.id;
      this.new = false;
      return Promise.resolve(this);
    })
    .catch(err => console.error(err));
  }
};
