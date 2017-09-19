module.exports = function (sequelize, DataTypes) {
  const AdType = sequelize.define('adType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nameCZ: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameEN: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameRU: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'adType',
    timestamps: true,
    paranoid: true,
  });

  return AdType;
};
