import { Router } from 'express';
import AdminMonthlyDutyScheduleController from '../../controllers/monthlyDutySchedule/monthlyDutySchedule.admin.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const adminMonthlyDutyScheduleRouter = Router();

adminMonthlyDutyScheduleRouter.use(
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
);

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
