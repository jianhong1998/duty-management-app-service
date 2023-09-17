'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('employee_monthly_availability', {
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
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
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
        await queryInterface.dropTable('employee_monthly_availability');
    },
};
