require('dotenv').config();
const FB = require('../../libs/FB');
const db = require('../../models')();

const whiteDictionary = [];

// make white dictionary
db.whiteWord.findAll()
.then((words) => {
  words.forEach(word => whiteDictionary.push(word.name));
})
// find all fb groups
.then(() => db.grabSource.findAll())
.then((sources) => {
  const groups = sources.map(source => new FB({
    groupId: source.extId,
    db,
    whiteDictionary,
    store: true,
    until: {
      // max: 50,
      // date: new Date('2017-09-02'),
      days: 14,
    },
  }));
  return Promise.all(groups.map(group => group.feed()));
})
.then((groups) => {
  groups.forEach((group) => {
    console.log(group.posts.length);
  });
})
.catch(err => console.error(err));
