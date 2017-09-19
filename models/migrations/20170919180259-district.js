'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('district', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    nameCZ: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nameEN: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nameRU: {
      type: Sequelize.STRING,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('district')
};
