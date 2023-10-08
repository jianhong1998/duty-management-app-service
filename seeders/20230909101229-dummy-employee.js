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
                name: 'Casper',
                employment_type: 'Full Time',
                role: 'Lead Service Crew',
                contact_number: 1112345678,
                mon_availability_time_slot_id: 1,
            },
            {
                name: 'Si Ying',
                employment_type: 'Part Time',
                role: 'Lead Service Crew',
                contact_number: 162222222,
            },
            {
                name: 'Seth',
                employment_type: 'Part Time',
                role: 'Junior Service Crew',
                contact_number: 163333333,
            },
            {
                name: 'Wei Jie',
                employment_type: 'Full Time',
                role: 'Junior Service Crew',
                contact_number: 164444444,
            },
            {
                name: 'Xing Ern',
                employment_type: 'Full Time',
                role: 'Service Crew',
                contact_number: 165555555,
            },
        ]);
        await queryInterface.bulkInsert('employee', [
            {
                name: 'Jian Hong',
                employment_type: 'Part Time',
                role: 'Service Crew',
                contact_number: 166666666,
                is_active: false,
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
