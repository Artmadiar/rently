'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ad', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    languageId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    adTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'adType',
        key: 'id'
      }
    },
    cityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    districtId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'district',
        key: 'id'
      }
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true
    },
    houseNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    flatTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'flatType',
        key: 'id'
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comPayment: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    area: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('ad')
};
