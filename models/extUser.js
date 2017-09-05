module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('extUser', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    extId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'extUser',
    timestamps: true,
    paranoid: true,
  });

  return Post;
};
