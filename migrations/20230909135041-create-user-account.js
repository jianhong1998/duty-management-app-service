'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_account', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            employeeId: {
                field: 'employee_id',
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'employee',
                },
            },
            emailAddress: {
                field: 'email_address',
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            accountType: {
                allowNull: false,
                field: 'account_type',
                type: Sequelize.ENUM({
                    name: 'enum_user_account_account_type',
                    values: ['Admin', 'User'],
                }),
            },
            accountStatus: {
                allowNull: false,
                field: 'account_status',
                type: Sequelize.ENUM({
                    name: 'enum_user_account_account_status',
                    values: ['Active', 'Disabled', 'Reseting Password'],
                }),
                defaultValue: 'Reseting Password',
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
        await queryInterface.dropTable('user_account');
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_user_account_account_type"',
        );
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_user_account_account_status"',
        );
    },
};
