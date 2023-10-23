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
                email_address: 'user@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 3,
                email_address: 'velit@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 4,
                email_address: 'scelerisque@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 5,
                email_address: 'ipsum.phasellus@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 6,
                email_address: 'natoque.penatibus.et@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 7,
                email_address: 'consectetuer.mauris@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 8,
                email_address: 'et@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 9,
                email_address: 'per.conubia.nostra@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 10,
                email_address: 'phasellus.dapibus@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 11,
                email_address: 'porttitor@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 12,
                email_address: 'tortor.integer@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 13,
                email_address: 'ultrices.posuere@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 14,
                email_address: 'dictum@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 15,
                email_address: 'aliquam.ultrices@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 16,
                email_address: 'ligula.aenean@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 17,
                email_address: 'felis.adipiscing@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 18,
                email_address: 'mauris.molestie.pharetra@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 19,
                email_address: 'ut@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Active',
            },
            {
                employee_id: 20,
                email_address: 'praesent.eu.dui@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Active',
            },
            {
                employee_id: 21,
                email_address: 'nulla.cras@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Disabled',
            },
            {
                employee_id: 22,
                email_address: 'ut.sem.nulla@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Disabled',
            },
            {
                employee_id: 23,
                email_address: 'ornare.elit.elit@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Disabled',
            },
            {
                employee_id: 24,
                email_address: 'eleifend.vitae.erat@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Disabled',
            },
            {
                employee_id: 25,
                email_address: 'nisi.aenean.eget@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Disabled',
            },
            {
                employee_id: 26,
                email_address: 'dictum.placerat@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Disabled',
            },
            {
                employee_id: 27,
                email_address: 'sem.magna@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Disabled',
            },
            {
                employee_id: 28,
                email_address: 'natoque@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'User',
                account_status: 'Disabled',
            },
            {
                employee_id: 29,
                email_address: 'quis.urna@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Disabled',
            },
            {
                employee_id: 30,
                email_address: 'pellentesque.habitant@test.com',
                password:
                    '$2a$15$Hgu9t4HDixhNih.mLa3lVO9z.wmPTyIFN6A9xyIkmfuPk2/vAuMea',
                account_type: 'Admin',
                account_status: 'Disabled',
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
