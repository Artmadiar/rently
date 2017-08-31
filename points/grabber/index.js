require('dotenv').config();
const FB = require('../../libs/FB');
const db = require('../../models');

const group = new FB({ groupId: 762748437151329 });

group
.feed({
  until: {
    // postId: ,
    // date: , or // days: ,
    // count: 50
  }
})
.then((feed) => {

})
.catch(err => console.error(err));
