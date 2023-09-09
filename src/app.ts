import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000');
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.use(cors());

app.listen(port, () => {
    console.log('App is running on port', port);
});
