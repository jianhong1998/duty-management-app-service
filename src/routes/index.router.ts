import { Router } from 'express';
import apiRouter from './api.router';

const indexRouter = Router();

indexRouter.use('/api', apiRouter);

export default indexRouter;
