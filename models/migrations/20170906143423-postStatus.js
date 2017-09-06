'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('post', 'status', { type: Sequelize.ENUM('open', 'applied', 'rejected'), allowNull: false, defaultValue: 'open' });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('post', 'status');
  }
};
