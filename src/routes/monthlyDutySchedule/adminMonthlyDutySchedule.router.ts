import { Router } from 'express';
import AdminMonthlyDutyScheduleController from '../../controllers/monthlyDutySchedule/monthlyDutySchedule.admin.controller';

const adminMonthlyDutyScheduleRouter = Router();

adminMonthlyDutyScheduleRouter.get(
    '/',
    AdminMonthlyDutyScheduleController.getAllMonthlyDutySchedulesByMonth,
);

adminMonthlyDutyScheduleRouter.post(
    '/',
    AdminMonthlyDutyScheduleController.generateNewMonthlyDutySchedule,
);

adminMonthlyDutyScheduleRouter.delete(
    '/',
    AdminMonthlyDutyScheduleController.deleteMonthlyDutyScheduleByMonth,
);

adminMonthlyDutyScheduleRouter.patch(
    '/confirm',
    AdminMonthlyDutyScheduleController.confirmMonthlyDutyScheduleByMonth,
);

export default adminMonthlyDutyScheduleRouter;
