require('dotenv').config();
const FB = require('../../libs/FB');
const db = require('../../models')();

db.grabSource.findAll()
.then((sources) => {
  const groups = sources.map(source => new FB({
    groupId: source.exId,
    db,
    until: {
      // max: 50,
      date: new Date('2017-09-02'),
    },
  }));
  return Promise.all(groups.map(group => group.feed()));
  // return groups[0].feed(params);
})
.then((groups) => {
  groups.forEach((group) => {
    console.log(group.posts.length);
  });
})
.catch(err => console.error(err));
