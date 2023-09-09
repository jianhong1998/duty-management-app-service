import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import db from './sequelize/sequelize';

dotenv.config();

db.init();

db.getInstance()
    .authenticate()
    .then(() => {
        console.log('Database is connected.');
    })
    .catch((error) => console.log(error))
    .then(() => {
        const app = express();
        const port = parseInt(process.env.PORT || '3000');

        app.use(cors());

        app.listen(port, () => {
            console.log('App is running on port', port);
        });
    });
