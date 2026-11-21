'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('vehiculos','tipo', {
      type: Sequelize.STRING(20),
      allowNull: true
    })
  },

  async down (queryInterface) {
  await queryInterface.removeColumn('vehiculos', 'tipp')
  }
};
