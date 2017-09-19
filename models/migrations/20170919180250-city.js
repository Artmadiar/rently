'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('city', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('city')
};
