'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('time_slot', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            startTime: {
                field: 'start_time',
                allowNull: false,
                type: Sequelize.TIME,
            },
            endTime: {
                field: 'end_time',
                allowNull: false,
                type: Sequelize.TIME,
            },
            isAvailableForMon: {
                field: 'is_available_for_mon',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForTue: {
                field: 'is_available_for_tue',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForWed: {
                field: 'is_available_for_wed',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForThu: {
                field: 'is_available_for_thu',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForFri: {
                field: 'is_available_for_fri',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForSat: {
                field: 'is_available_for_sat',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isAvailableForSun: {
                field: 'is_available_for_sun',
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isDeleted: {
                field: 'is_deleted',
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('time_slot');
    },
};
