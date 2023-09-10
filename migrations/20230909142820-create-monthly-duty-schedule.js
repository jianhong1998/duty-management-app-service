'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('monthly_duty_schedule', {
            date: {
                type: Sequelize.DATEONLY,
                primaryKey: true,
            },
            employeeId: {
                field: 'employee_id',
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'employee',
                    key: 'id',
                },
            },
            timeSlotId: {
                field: 'time_slot_id',
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            version: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            isConfirmed: {
                allowNull: false,
                field: 'is_confirmed',
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('monthly_duty_schedule');
    },
};
