import { Router } from 'express';
import apiRouter from './api.router';

const indexRouter = Router();

indexRouter.use('/', (_, res) => res.sendStatus(200));
indexRouter.use('/api', apiRouter);

export default indexRouter;
