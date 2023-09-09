require('dotenv').config();

module.exports = {
    development: {
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB_DATABASE,
        host: 'localhost',
        dialect: 'postgres',
    },
    docker: {
        username: process.env.DOCKER_DB_USERNAME,
        password: process.env.DOCKER_DB_PASSWORD,
        database: process.env.DOCKER_DB_DATABASE,
        host: process.env.DOCKER_DB_HOST,
        port: Number.parseInt(process.env.DOCKER_DB_PORT),
        dialect: 'postgres',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
};
