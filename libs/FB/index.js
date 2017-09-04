const moment = require('moment');
const rp = require('request-promise');
const fbUrlConstructor = require('./fbUrlConstructor');

module.exports = class FB {
  /**
   * Constructor
   *
   * @param params [Object] example:
   * {
   *    groupId: int,
   *    db: DB connection,
   *    until: {
   *      [max]: int,       // until max count of the posts get the feed
   *      [date]: Date      // until which date of the posts get the feed
   *      [days]: int       // until which date of the posts from now get the feed
   *      [postId]: string  // until which post id get the feed
   *    }
   * }
   */
  constructor(params) {
    if (!params || !params.groupId) {
      throw new Error('Group ID is required param');
    }

    if (!params.db) {
      throw new Error('DB Connection is required param');
    }

    this.groupId = params.groupId;
    this.db = params.db;

    this.currentUrl = fbUrlConstructor(params);
    this.success = undefined;
    this.posts = [];

    // until
    if (!params.until) {
      this.until = { max: 25, count: 0 };
    } else {
      this.until = Object.assign({}, params.until);
    }

    // until options
    // days to date
    if (params.until.days !== undefined) {
      this.until.date = moment().add(params.until.days, 'days');
    }
  }

  /**
   * Subfunction to get the posts from feed of the group
   * @return [Promise]  chain of the requests to get the feed
   */
  getPart() {
    return rp({
      method: 'GET',
      uri: this.currentUrl,
      resolveWithFullResponse: true,
      simple: false,
    })
    .then((response) => {
      if (response.statusCode !== 200) {
        // set the success of request
        this.success = false;
        return this.feed();
      }

      // set the success of request
      this.success = true;
      // parse the response
      const result = JSON.parse(response.body);
      // store all posts
      this.posts = this.posts.concat(result.data);
      // url to the next page
      this.currentUrl = result.paging.next;
      return this.feed();
    })
    .catch(err => console.error(err));
  }

  /**
   * Get the posts from feed of the group
   * @return [Promise] this object with chain of the requests to get the feed
   */
  feed() {
    if (this.success === false) {
      return Promise.resolve(this);
    }

    if (this.posts.length === 0) {
      return this.getPart();
    }

    // CONDITIONS OF GETTING FEED
    // max
    if (this.until.max !== undefined) {
      if (this.posts.length < this.until.max) {
        return this.getPart();
      }
    }
    // date
    if (this.until.date !== undefined) {
      const latestDate = moment(this.posts[this.posts.length - 1].created_time);
      if (latestDate.diff(this.until.date) >= 0) {
        return this.getPart();
      }
    }

    // postId
    if (this.until.postId !== undefined) {
      const founded = this.posts.filter(post => post.id === this.posts.until.postId);
      if (founded.length === 0) {
        return this.getPart();
      }
    }

    return Promise.resolve(this);
  }

  /**
   * Remove posts which we don't need by white list
   *
   * @return Promise - promise of this object with promise chain of the removing posts
   */
  filter() {
    if (this.posts.length === 0) {
      return Promise.resolve(this);
    }

    return this.db.whiteWord.findAll()
    .then((words) => {
      console.log(words.length);
    });
  }

  /**
   * Store posts to db
   */
  storeToDataBase() {
    if (this.posts.length === 0) {
      return Promise.resolve(this);
    }
  }
};
