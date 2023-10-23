import { Router } from 'express';
import AdminMonthlyDutyScheduleController from '../../controllers/monthlyDutySchedule/monthlyDutySchedule.admin.controller';

const adminMonthlyDutyScheduleRouter = Router();

adminMonthlyDutyScheduleRouter.post(
    '/',
    AdminMonthlyDutyScheduleController.generateNewMonthlyDutySchedule,
);

export default adminMonthlyDutyScheduleRouter;
