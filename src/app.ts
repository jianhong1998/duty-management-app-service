import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import db from './sequelize/sequelize';
import bodyParser, { json } from 'body-parser';
import indexRouter from './routes/index.router';
import isSequelizeError from './sequelize/sequelizeErrorVerification.service';

dotenv.config();

db.init();

db.getInstance()
    .authenticate()
    .then(() => {
        console.log('Database is connected.');
    })
    .then(() => {
        const app = express();
        const port = parseInt(process.env.PORT || '3000');

        app.use(cors());
        app.use(
            bodyParser.urlencoded({
                extended: false,
            }),
        );
        app.use(json());
        app.use('/', indexRouter);

        app.listen(port, () => {
            console.log('App is running on port', port);
        });
    })
    .catch((error) => {
        if (isSequelizeError(error)) {
            console.log(error.original.message);
            return;
        }

        if (error instanceof Error) {
            console.log(error.message);
            return;
        }

        console.log(error);
    });
