import { Router } from 'express';
import employeeRouter from './employee/employee.router';
import authRouter from './auth/auth.router';
import timeSlotRouter from './timeSlot/timeSlot.router';
import userAccountRouter from './userAccount/userAccount.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/employee', employeeRouter);
apiRouter.use('/time-slot', timeSlotRouter);
apiRouter.use('/user-account', userAccountRouter);

export default apiRouter;
