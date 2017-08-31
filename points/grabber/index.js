require('dotenv').config();
const FB = require('../../libs/FB');
const db = require('../../models')();

const params = {
  until: {
    // postId: ,
    // date: , or // days: ,
    // count: 50
  }
};

db.grabSource.findAll()
.then((sources) => {
  const groups = sources.map(source => new FB({ groupId: source.exId }));
  return Promise.all(groups.map(group => group.feed(params)));
})
.then((feeds) => {
  feeds.forEach((feed) => {
    console.log(feed);
  });
})
.catch(err => console.error(err));
