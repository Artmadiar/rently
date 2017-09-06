const moment = require('moment');
const rp = require('request-promise');
const fbUrlConstructor = require('./fbUrlConstructor');
const ExtUser = require('./extUser');
const Post = require('./post');

module.exports = class FB {
  /**
   * Constructor
   *
   * @param params [Object] example:
   * {
   *    groupId: int,
   *    db: DB connection,
   *    store: bool,        // store the posts after feed() or not. default - false
   *    until: {
   *      [max]: int,       // until max count of the posts get the feed. default - 50
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

    // ID of group
    this.groupId = params.groupId;
    // DB connection
    this.db = params.db;

    // current url of page of feed
    this.currentUrl = fbUrlConstructor(params);
    // success of request to fb
    this.success = undefined;
    // clear posts
    this.posts = [];
    // rejected posts after clear
    this.rejectedPosts = [];

    // store
    this.store = false;
    if (params.store) {
      this.store = params.store;
    }

    // white dictionary
    this.whiteDictionary = [];

    if (params.whiteDictionary) {
      this.whiteDictionary = params.whiteDictionary;
    }

    // until
    if (!params.until) {
      this.until = { max: 25, count: 0 };
    } else {
      this.until = Object.assign({}, params.until);
    }

    // until options
    // days to date
    if (params.until.days !== undefined) {
      this.until.date = moment().add(params.until.days, 'days').toDate();
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

    return this.clearFeed();
  }

  /**
   * Remove posts which we don't need by white list
   *
   * @return Promise - promise of this object with promise chain of the removing posts
   */
  clearFeed() {
    if (this.posts.length === 0) {
      return Promise.resolve(this);
    }

    if (!this.whiteDictionary || this.whiteDictionary.length === 0) {
      throw new Error('White dictionary is empty!');
    }

    // make new array of posts. clear posts
    this.posts = this.posts.reduce((result, post) => {
      // does it have any word from white dictionary
      const itHas = this.whiteDictionary.some(word => (post.message.indexOf(word) > 0));
      // if it is - add to new array
      if (itHas) {
        return result.concat(post);
      }
      // otherwise add this post to array 'rejected posts'
      this.rejectedPosts.push(post);

      return result;
    }, []);

    if (!this.store) {
      return Promise.resolve(this);
    }

    return this.saveToDB();
  }

  /**
   * Save posts to db
   */
  saveToDB() {
    if (this.posts.length === 0) {
      return Promise.resolve(this);
    }

    // save extUsers
    const extUsers = this.posts.map((post) => new ExtUser(this.db, post.from));
    return Promise.all(extUsers.map(extUser => extUser.save()))
      .then((users) => {
        // save posts
        const posts = this.posts.map(post => new Post(this.db, post));
        return Promise.all(posts.map(post => post.save()));
      })
      // return this object
      .then(posts => Promise.resolve(this));
  }
};
