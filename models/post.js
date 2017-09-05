module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('post', {
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
    extCreatedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    extUpdatedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    extUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'extUser',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    originText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'post',
    timestamps: true,
    paranoid: true,
  });

  return Post;
};
