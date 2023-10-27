import { Router } from 'express';
import MonthlyDutyScheduleMiddleware from '../../controllers/monthlyDutySchedule/monthlyDutyScheduleMiddleware.controller';
import MonthlyDutyScheduleController from '../../controllers/monthlyDutySchedule/monthlyDutySchedule.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const monthlyDutyScheduleRouter = Router();

monthlyDutyScheduleRouter.use(
    AuthMiddleware.authorized([UserAccountType.ADMIN, UserAccountType.USER]),
);

monthlyDutyScheduleRouter.get(
    '/',
    MonthlyDutyScheduleMiddleware.verifyYearMonthQuery,
    MonthlyDutyScheduleController.getMonthlyDutySchedulesByMonth,
);

export default monthlyDutyScheduleRouter;
