module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('city', {
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
    tableName: 'city',
    timestamps: true,
    paranoid: true,
  });

  return City;
};
