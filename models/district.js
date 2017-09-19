module.exports = function (sequelize, DataTypes) {
  const District = sequelize.define('district', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
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
    tableName: 'district',
    timestamps: true,
    paranoid: true,
  });

  return District;
};
