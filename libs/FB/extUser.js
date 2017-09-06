module.exports = class FBUser {
  /**
   * Constructor
   *
   * @param {DB Connection} db
   * @param {Object} user { id, name }
   */
  constructor(db, user) {
    if (!db) {
      throw new Error('DB Connection is required');
    }

    if (!user || !user.id || !user.name) {
      throw new Error('User data is required');
    }

    this.id = 0;
    this.new = true;

    this.db = db;

    this.source = 'fb';
    this.extId = user.id;
    this.name = user.name;
  }

  /**
   * Find in the DB extUser by extID
   * If wouldn't find - create new
   * @return promise of this object
   */
  save() {
    return this.db.extUser.findOne({
      where: { source: this.source, extId: this.extId },
    })
    .then((user) => {
      if (!user) {
        return this.db.extUser.create({
          source: this.source,
          extId: this.extId,
          name: this.name,
        });
      }
      return Promise.resolve(user);
    })
    .then((user) => {
      this.id = user.id;
      this.new = false;
      return Promise.resolve(this);
    })
    .catch(err => console.error(err));
  }
};
