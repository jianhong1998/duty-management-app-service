'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('employee', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            employmentType: {
                field: 'employment_type',
                allowNull: false,
                type: Sequelize.ENUM(['Full Time', 'Part Time']),
            },
            role: {
                allowNull: false,
                type: Sequelize.ENUM([
                    'Lead Service Crew',
                    'Service Crew',
                    'Junior Service Crew',
                ]),
            },
            contactNumber: {
                field: 'contact_number',
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                field: 'is_active',
                defaultValue: 'true',
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
        await queryInterface.dropTable('employee');
    },
};
