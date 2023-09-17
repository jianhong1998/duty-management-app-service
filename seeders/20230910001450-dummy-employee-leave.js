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
        await queryInterface.bulkInsert('employee_leave', [
            {
                employee_id: 2,
                date: new Date('2023-09-30'),
                apply_reason: 'Exam',
                approval_status: 'Approved',
            },
            {
                employee_id: 3,
                date: new Date('2023-09-30'),
                apply_reason: 'Vacation',
                approval_status: 'Rejected',
            },
            {
                employee_id: 4,
                date: new Date('2023-09-30'),
                apply_reason: 'Vacation',
                approval_status: 'Pending',
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
        await queryInterface.bulkDelete('employee_leave', null, {});
    },
};
