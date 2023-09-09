import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from '../../config/config';
import { dbModels } from './models';

let sequelize: Sequelize;

const dbConfig = config[process.env.NODE_ENV || 'development'];

const db = {
    init: () => {
        const dbOptions: SequelizeOptions = {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            pool: {
                min: 0,
                max: 5,
                acquire: 30000,
                idle: 10000,
            },
            models: dbModels,
            logging: false,
            timezone: '+08:00',
        };

        if (dbConfig.port) {
            dbOptions.port = dbConfig.port;
        }

        sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            dbOptions,
        );
    },
    getInstance: (): Sequelize => {
        if (sequelize) {
            return sequelize;
        }

        throw new Error('Database is not initialized.');
    },
};

export default db;
