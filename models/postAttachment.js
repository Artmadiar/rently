module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('postAttachment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    originText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'postAttachment',
    timestamps: true,
    paranoid: true,
  });

  return Post;
};
