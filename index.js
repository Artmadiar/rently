require('dotenv').config();
const FB = require('./FB');

const group = new FB({ groupId: 762748437151329 });

group
.feed({
  until:{
    // postId: ,
    // date: , or // days: ,
    // count: 50
  }
})
.then((feed) => {
  console.log(feed.data);
})
.catch(err => console.error(err));
