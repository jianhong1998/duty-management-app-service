import { Router } from 'express';
import employeeRouter from './employee/employee.router';
import authRouter from './auth/auth.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/employee', employeeRouter);

export default apiRouter;
