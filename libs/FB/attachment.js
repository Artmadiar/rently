module.exports = class Attachment {
  /**
   * Constructor
   *
   * @param {DB Connection} db
   * @param {Number} postId
   * @param {Object} attachment {
   *    media: {
   *       image: { src, height, width }
   *    },
   *    target: { id, url },
   *    type: photo,
   *    url: 'https://photos.vk.com/123,
   * }
   */
  constructor(db, postId, attachment) {
    if (!db) {
      throw new Error('DB Connection is required');
    }

    if (!postId) {
      throw new Error('Post ID is required');
    }

    if (!attachment || !attachment.url || !attachment.type) {
      throw new Error('User data is required');
    }

    this.id = 0;
    this.new = true;

    this.db = db;

    this.postId = postId;

    this.url = attachment.url;
    this.src = attachment.media.image.src;

    this.type = attachment.type;
    this.originText = JSON.stringify(attachment);

    // size of the image
    this.height = 0;
    this.width = 0;

    if (attachment.media && attachment.media.image) {
      this.height = attachment.media.image.height || 0;
      this.width = attachment.media.image.width || 0;
    }
  }

  /**
   * Find in the DB extUser by extID
   * If wouldn't find - create new
   * @return promise of this object
   */
  save() {
    return this.db.postAttachment.findOne({
      where: { postId: this.postId, src: this.src },
    })
    .then((attachment) => {
      if (!attachment) {
        return this.db.postAttachment.create({
          postId: this.postId,
          type: this.type,
          url: this.url,
          src: this.src,
          height: this.height,
          width: this.width,
          originText: this.originText,
        });
      }
      return Promise.resolve(attachment);
    })
    .then((attachment) => {
      this.id = attachment.id;
      this.new = false;
      return Promise.resolve(this);
    })
    .catch(err => console.error(err));
  }
};
