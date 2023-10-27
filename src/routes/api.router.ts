import { Router } from 'express';
import adminEmployeeRouter from './employee/adminEmployee.router';
import authRouter from './auth/auth.router';
import adminTimeSlotRouter from './timeSlot/adminTimeSlot.router';
import userAccountRouter from './userAccount/userAccount.router';
import employeeRouter from './employee/employee.router';
import timeSlotRouter from './timeSlot/timeSlot.router';
import employeeTimeSlotRouter from './timeSlot/employeeTimeSlot.router';
import adminMonthlyDutyScheduleRouter from './monthlyDutySchedule/adminMonthlyDutySchedule.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/employee', employeeRouter);
apiRouter.use('/time-slot', timeSlotRouter);
apiRouter.use('/employee-time-slot', employeeTimeSlotRouter);
apiRouter.use('/user-account', userAccountRouter);
apiRouter.use('/admin/time-slot', adminTimeSlotRouter);
apiRouter.use('/admin/employee', adminEmployeeRouter);
apiRouter.use('/admin/monthly-schedule', adminMonthlyDutyScheduleRouter);

export default apiRouter;
