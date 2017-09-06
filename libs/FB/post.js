const moment = require('moment');
const rp = require('request-promise');
const fbUrlConstructor = require('./fbUrlConstructor');
const Attachment = require('./attachment');

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

    // db connection
    this.db = db;

    // success of the request
    this.success = undefined;

    // attachments
    this.attachments = [];

    this.source = 'fb';
    this.status = 'open';
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

  /**
   * Get attachments and save this post with attachments
   *
   * @return {Promise} promise of this object with chain
   */
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
          status: this.status,
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
      return this.getAttachments();
    })
    .then(() => this.saveAttachments())
    .then(() => Promise.resolve(this))
    .catch(err => console.error(err));
  }

    /**
   * Download attachments of the post
   * @return [Promise]  chain of the requests to get the attachments
   */
  getAttachments() {
    const uri = fbUrlConstructor.postAttachments({ postId: this.extId });
    return rp({
      method: 'GET',
      uri,
      resolveWithFullResponse: true,
      simple: false,
    })
    .then((response) => {
      if (response.statusCode !== 200) {
        // set the success of request
        this.success = false;
        return Promise.resolve(this);
      }

      // set the success of request
      this.success = true;

      // parse the response
      const body = JSON.parse(response.body);
      const subattachments = body.data.length === 0 ? {} : body.data[0].subattachments;
      if (!subattachments || !subattachments.data || subattachments.data.length === 0) {
        return Promise.resolve(this);
      }
      this.attachments = subattachments.data.map(subattachment => new Attachment(this.db, this.id, subattachment));
      return Promise.resolve(this);
    })
    .catch(err => console.error(err));
  }

  /**
   * Save attachments to db
   */
  saveAttachments() {
    if (this.attachments.length === 0) {
      return Promise.resolve(this);
    }
    return Promise.all(this.attachments.map(attachment => attachment.save()))
      .then(() => Promise.resolve(this));
  }
};
