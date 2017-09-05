module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('whiteWord', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'whiteWord',
    timestamps: true,
    paranoid: true,
  });

  return Post;
};
