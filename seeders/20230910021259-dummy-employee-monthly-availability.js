'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('employee_monthly_availability', [
            {
                date: new Date('2023-09-11'),
                employee_id: 1,
                time_slot_id: 1,
            },
            {
                date: new Date('2023-09-11'),
                employee_id: 2,
                time_slot_id: 1,
            },
            {
                date: new Date('2023-09-11'),
                employee_id: 3,
                time_slot_id: 1,
            },
            {
                date: new Date('2023-09-11'),
                employee_id: 4,
                time_slot_id: 1,
            },
            {
                date: new Date('2023-09-11'),
                employee_id: 5,
                time_slot_id: 1,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(
            'employee_monthly_availability',
            null,
            {},
        );
    },
};
