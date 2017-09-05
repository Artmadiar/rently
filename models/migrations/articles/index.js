const db = require('../../../models')();
const grabSources = require('./grabSources');
const whiteWords = require('./whiteWords');

const tables = {
  grabSource: false,
  whiteWords: true,
};

// grabSource - example
if (tables.grabSource) {
  db.grabSource.bulkCreate(grabSources)
  .then(() => db.grabSource.findAll())
  .then((sources) => {
    console.log(`Added new ${sources.length} grab sources!`);
  })
  .catch(err => console.error(err));
}


// white words - default
if (tables.whiteWords) {
  db.whiteWord.bulkCreate(whiteWords)
  .then(() => db.whiteWord.findAll())
  .then((words) => {
    console.log(`Added new ${words.length} white words!`);
  })
  .catch(err => console.error(err));
}
