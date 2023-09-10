import { Router } from 'express';
import employeeRouter from './employee/employee.router';

const apiRouter = Router();

apiRouter.use('/employee', employeeRouter);

export default apiRouter;
