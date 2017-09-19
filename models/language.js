module.exports = function (sequelize, DataTypes) {
  const Language = sequelize.define('language', {
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
    tableName: 'language',
    timestamps: true,
    paranoid: true,
  });

  return Language;
};
