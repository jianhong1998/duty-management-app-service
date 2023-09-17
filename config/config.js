require('dotenv').config();

module.exports = {
    development: {
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB_DATABASE,
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false,
        },
        timezone: '+08:00',
    },
    docker: {
        username: process.env.DOCKER_DB_USERNAME,
        password: process.env.DOCKER_DB_PASSWORD,
        database: process.env.DOCKER_DB_DATABASE,
        host: process.env.DOCKER_DB_HOST,
        port: Number.parseInt(process.env.DOCKER_DB_PORT),
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false,
        },
        timezone: '+08:00',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false,
        },
        timezone: '+08:00',
    },
    production: {
        username: process.env.AWS_DB_USERNAME,
        password: process.env.AWS_DB_PASSWORD,
        database: 'postgres',
        host: process.env.AWS_DB_HOST,
        port: process.env.AWS_DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            socketPath: process.env.AWS_DB_HOST,
        },
        seederStorage: 'sequelize',
    },
};
