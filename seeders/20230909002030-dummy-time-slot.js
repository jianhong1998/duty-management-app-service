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
        queryInterface.bulkInsert('time_slot', [
            {
                start_time: new Date('1970-01-01T15:00:00+08:00'),
                end_time: new Date('1970-01-01T22:00:00+08:00'),
                is_available_for_mon: true,
                is_available_for_tue: false,
                is_available_for_wed: true,
                is_available_for_thu: true,
                is_available_for_fri: true,
                is_available_for_sat: false,
                is_available_for_sun: false,
            },
            {
                start_time: new Date('1970-01-01T17:00:00+08:00'),
                end_time: new Date('1970-01-01T22:00:00+08:00'),
                is_available_for_mon: true,
                is_available_for_tue: false,
                is_available_for_wed: true,
                is_available_for_thu: true,
                is_available_for_fri: true,
                is_available_for_sat: true,
                is_available_for_sun: true,
            },
            {
                start_time: new Date('1970-01-01T13:00:00+08:00'),
                end_time: new Date('1970-01-01T22:00:00+08:00'),
                is_available_for_mon: false,
                is_available_for_tue: false,
                is_available_for_wed: false,
                is_available_for_thu: false,
                is_available_for_fri: false,
                is_available_for_sat: true,
                is_available_for_sun: true,
            },
            {
                start_time: new Date('1970-01-01T10:00:00+08:00'),
                end_time: new Date('1970-01-01T22:00:00+08:00'),
                is_available_for_mon: false,
                is_available_for_tue: false,
                is_available_for_wed: false,
                is_available_for_thu: false,
                is_available_for_fri: false,
                is_available_for_sat: true,
                is_available_for_sun: true,
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
    },
};
