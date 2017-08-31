const rp = require('request-promise');
const settings = require('./settings.js');

module.exports = class FB {
  constructor(params) {
    this.settings = settings(params);
  }

  /* params.until
        postId: ,
        date or days,
        count: 50
  */
  feed(params) {
    return rp({
      method: 'GET',
      uri: this.settings.group.url,
      resolveWithFullResponse: true,
      simple: false,
    })
    .then((response) => {
      if (response.statusCode !== 200) {
        return Promise.resolve({ success: false, status: response.statusCode });
      }

      const data = JSON.parse(response.body);
      return Promise.resolve(data);
    })
    .catch(err => {
        // Crawling failed...
    });
  }

};
