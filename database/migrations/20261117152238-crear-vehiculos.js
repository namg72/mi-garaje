'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("vehiculos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

    },

    marca: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    modelo: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    matricula: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      km: {
        type: Sequelize.INTEGER,
        
      },
      fechaProximaITV: {
        type: Sequelize.DATEONLY,
        
      },
      bastidor: {
        type: Sequelize.STRING(17),
        allowNull: true,
      },
      fechaPrimeraMatriculacion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true,
      },


    })
  },

  async down (queryInterface,) {
    await queryInterface.dropTable("vehiculos");
  }
};
