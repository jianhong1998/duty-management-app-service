import { Router } from 'express';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';
import TimeSlotController from '../../controllers/timeSlot/timeSlot.controller';

const timeSlotRouter = Router();

timeSlotRouter.use(
    AuthMiddleware.authorized([UserAccountType.USER, UserAccountType.ADMIN]),
);

timeSlotRouter.get('/', TimeSlotController.getAllTimeSlots);

export default timeSlotRouter;
