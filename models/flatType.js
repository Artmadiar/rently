module.exports = function (sequelize, DataTypes) {
  const FlatType = sequelize.define('flatType', {
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
    tableName: 'flatType',
    timestamps: true,
    paranoid: true,
  });

  return FlatType;
};
