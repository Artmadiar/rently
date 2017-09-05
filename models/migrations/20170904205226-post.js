'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('post', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extCreatedTime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    extUpdatedTime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    caption: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    extUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'extUser',
        key: 'id'
      }
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    originText: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('post')
};
