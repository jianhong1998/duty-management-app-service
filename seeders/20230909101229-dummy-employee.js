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

        await queryInterface.bulkInsert('employee', [
            {
                name: 'Employee 1',
                employment_type: 'Full Time',
                role: 'Lead Service Crew',
                contact_number: 161111111,
            },
            {
                name: 'Employee 2',
                employment_type: 'Part Time',
                role: 'Lead Service Crew',
                contact_number: 162222222,
            },
            {
                name: 'Employee 3',
                employment_type: 'Part Time',
                role: 'Junior Service Crew',
                contact_number: 163333333,
            },
            {
                name: 'Employee 4',
                employment_type: 'Full Time',
                role: 'Junior Service Crew',
                contact_number: 164444444,
            },
            {
                name: 'Employee 5',
                employment_type: 'Full Time',
                role: 'Service Crew',
                contact_number: 165555555,
            },
            {
                name: 'Employee 6',
                employment_type: 'Part Time',
                role: 'Service Crew',
                contact_number: 166666666,
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
        await queryInterface.bulkDelete('employee', null, {});
    },
};
