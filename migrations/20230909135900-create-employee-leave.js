'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('employee_leave', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            employeeId: {
                field: 'employee_id',
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'employee',
                    key: 'id',
                },
            },
            date: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            applyReason: {
                field: 'apply_reason',
                allowNull: true,
                type: Sequelize.TEXT,
            },
            approvalStatus: {
                field: 'approval_status',
                allowNull: false,
                type: Sequelize.ENUM({
                    name: 'enum_employee_leave_approval_status',
                    values: ['Approved', 'Pending', 'Rejected'],
                }),
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
        await queryInterface.dropTable('employee_leave');
        await queryInterface.sequelize.query(`
            DROP TYPE "enum_employee_leave_approval_status";
        `);
    },
};
