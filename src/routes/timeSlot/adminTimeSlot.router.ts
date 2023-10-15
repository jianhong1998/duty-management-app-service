import { Router } from 'express';
import AdminTimeSlotController from '../../controllers/timeSlot/timeSlot.admin.controller';
import TimeSlotMiddleware from '../../controllers/timeSlot/timeSlotMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const adminTimeSlotRouter = Router();

adminTimeSlotRouter.use(AuthMiddleware.authorized([UserAccountType.ADMIN]));

adminTimeSlotRouter.use('/:id', TimeSlotMiddleware.verifyTimeSlotId);

adminTimeSlotRouter.get('/:id', AdminTimeSlotController.getTimeSlot);

export default adminTimeSlotRouter;
