'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('postAttachment', {
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
    type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    src: {
      type: Sequelize.STRING,
      allowNull: false
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    width: {
      type: Sequelize.INTEGER,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('postAttachment')
};
