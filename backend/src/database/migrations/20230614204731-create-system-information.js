"use strict";

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("SystemInfo", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cpu: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            memory: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            disks: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            network: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        }),

    down: (queryInterface) => queryInterface.dropTable("SystemInfo"),
};
