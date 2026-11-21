"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "vehiculos",
        "tipo",
        {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "vehiculos",
        "tipo",
        {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        { transaction },
      );
    });
  },
};
