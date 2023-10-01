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
        await queryInterface.bulkInsert('user_account', [
            {
                employee_id: 1,
                email_address: 'admin@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 2,
                email_address: 'user1@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 3,
                email_address: 'user2@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 4,
                email_address: 'user3@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 5,
                email_address: 'user4@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 6,
                email_address: 'user5@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Pending Approval',
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
        await queryInterface.bulkDelete('user_account', null, {});
    },
};
