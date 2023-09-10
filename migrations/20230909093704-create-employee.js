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
                type: Sequelize.ENUM({
                    name: 'enum_employee_employment_type',
                    values: ['Full Time', 'Part Time'],
                }),
            },
            role: {
                allowNull: false,
                type: Sequelize.ENUM({
                    name: 'enum_employee_role',
                    values: [
                        'Lead Service Crew',
                        'Service Crew',
                        'Junior Service Crew',
                    ],
                }),
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
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_employee_employment_type";',
        );
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_employee_role";',
        );
    },
};
