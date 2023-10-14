import { Router } from 'express';
import AdminEmployeeController from '../../controllers/employee/employee.admin.controller';
import EmployeeMiddleware from '../../controllers/employee/employeeMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const adminEmployeeRouter = Router();

adminEmployeeRouter.use(AuthMiddleware.authorized([UserAccountType.ADMIN]));

adminEmployeeRouter.use('/', EmployeeMiddleware.verifyRequestBody);
adminEmployeeRouter.use('/:employeeId', EmployeeMiddleware.verifyEmployeeId);

adminEmployeeRouter.get('/', AdminEmployeeController.getAllEmployeesHandler);
adminEmployeeRouter.get(
    '/:employeeId',
    AdminEmployeeController.getEmployeeHandler,
);
adminEmployeeRouter.post('/', AdminEmployeeController.createEmployeeHandler);
adminEmployeeRouter.put(
    '/:employeeId',
    AdminEmployeeController.updateEmployeesHandler,
);
adminEmployeeRouter.delete(
    '/:employeeId',
    AdminEmployeeController.deleteEmployeeHandler,
);

export default adminEmployeeRouter;
