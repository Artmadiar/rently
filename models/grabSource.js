module.exports = function (sequelize, DataTypes) {
  const GrabSources = sequelize.define('grabSource', {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'grabSource',
    timestamps: true,
    paranoid: true,
  });

  return GrabSources;
};
