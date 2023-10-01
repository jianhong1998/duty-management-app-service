import { Router } from 'express';
import TimeSlotController from '../../controllers/timeSlot/timeSlot.controller';
import TimeSlotMiddleware from '../../controllers/timeSlot/timeSlotMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccountType.enum';

const timeSlotRouter = Router();

timeSlotRouter.use(
    AuthMiddleware.authorized([UserAccountType.ADMIN, UserAccountType.USER]),
);

timeSlotRouter.use('/:id', TimeSlotMiddleware.verifyTimeSlotId);

timeSlotRouter.get('/:id', TimeSlotController.getTimeSlot);

export default timeSlotRouter;
