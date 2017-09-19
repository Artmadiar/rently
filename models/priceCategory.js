module.exports = function (sequelize, DataTypes) {
  const PriceCategory = sequelize.define('priceCategory', {
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
    tableName: 'priceCategory',
    timestamps: true,
    paranoid: true,
  });

  return PriceCategory;
};
