import { Router } from 'express';
import EmployeeTimeSlotController from '../../controllers/timeSlot/employeeTimeSlot.controller';
import EmployeeMiddleware from '../../controllers/employee/employeeMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const employeeTimeSlotRouter = Router();

employeeTimeSlotRouter.use(
    AuthMiddleware.authorized([UserAccountType.USER, UserAccountType.ADMIN]),
);
employeeTimeSlotRouter.use('/:employeeId', EmployeeMiddleware.verifyEmployeeId);

employeeTimeSlotRouter.get(
    '/:employeeId',
    EmployeeTimeSlotController.getEmployeeDefaultWeeklyTimeSlotsHanlder,
);

export default employeeTimeSlotRouter;
