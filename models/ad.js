module.exports = function (sequelize, DataTypes) {
  const Ad = sequelize.define('ad', {
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
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    adTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'adType',
        key: 'id'
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'district',
        key: 'id'
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    houseNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    flatTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'flatType',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comPayment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'ad',
    timestamps: true,
    paranoid: true,
  });

  return Ad;
};
