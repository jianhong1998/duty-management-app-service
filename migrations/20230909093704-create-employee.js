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
                field: 'is_active',
                allowNull: false,
                defaultValue: 'true',
                type: Sequelize.BOOLEAN,
            },
            monAvailabilityTimeSlotId: {
                field: 'mon_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            tueAvailabilityTimeSlotId: {
                field: 'tue_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            wedAvailabilityTimeSlotId: {
                field: 'wed_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            thuAvailabilityTimeSlotId: {
                field: 'thu_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            friAvailabilityTimeSlotId: {
                field: 'fri_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            satAvailabilityTimeSlotId: {
                field: 'sat_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
                references: {
                    model: 'time_slot',
                    key: 'id',
                },
            },
            sunAvailabilityTimeSlotId: {
                field: 'sun_availability_time_slot_id',
                allowNull: true,
                defaultValue: null,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('employee');
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_employee_employment_type";',
        );
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_employee_role";',
        );
    },
};
