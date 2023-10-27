import { Router } from 'express';
import AdminMonthlyDutyScheduleController from '../../controllers/monthlyDutySchedule/monthlyDutySchedule.admin.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';
import MonthlyDutyScheduleMiddleware from '../../controllers/monthlyDutySchedule/monthlyDutyScheduleMiddleware.controller';

const adminMonthlyDutyScheduleRouter = Router();

adminMonthlyDutyScheduleRouter.use(
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
);

adminMonthlyDutyScheduleRouter.get(
    '/',
    MonthlyDutyScheduleMiddleware.verifyYearMonthQuery,
    AdminMonthlyDutyScheduleController.getAllMonthlyDutySchedulesByMonth,
);

adminMonthlyDutyScheduleRouter.post(
    '/',
    MonthlyDutyScheduleMiddleware.verifyYearMonthBody,
    AdminMonthlyDutyScheduleController.generateNewMonthlyDutySchedule,
);

adminMonthlyDutyScheduleRouter.delete(
    '/',
    MonthlyDutyScheduleMiddleware.verifyYearMonthQuery,
    AdminMonthlyDutyScheduleController.deleteMonthlyDutyScheduleByMonth,
);

adminMonthlyDutyScheduleRouter.patch(
    '/confirm',
    MonthlyDutyScheduleMiddleware.verifyYearMonthQuery,
    AdminMonthlyDutyScheduleController.confirmMonthlyDutyScheduleByMonth,
);

export default adminMonthlyDutyScheduleRouter;
