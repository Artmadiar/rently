const db = require('../../../models')();
const grabSources = require('./grabSources');


db.grabSource.bulkCreate(grabSources)
.then(() => db.grabSource.findAll())
.then((sources) => {
  console.log(`Added new ${sources.length} grab sources!`);
})
.catch(err => console.error(err));
