"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("vehiculos", {
        fields: ["tipo"],
        type: "check",
        name: "vehiculos_tipo_valido",
        where: {
          tipo: {
            [Sequelize.Op.in]: [
              "coche",
              "moto",
              "furgoneta",
              "camion",
              "autocaravana",
            ],
          },
        },
        transaction,
      });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint(
        "vehiculos",
        "vehiculos_tipo_valido",
        { transaction },
      );
    });
  },
};
