import { Router } from 'express';
import EmployeeController from '../../controllers/employee/employee.controller';
import EmployeeMiddleware from '../../controllers/employee/employeeMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccountType.enum';

const employeeRouter = Router();

employeeRouter.use(AuthMiddleware.authorized([UserAccountType.ADMIN]));

employeeRouter.use('/', EmployeeMiddleware.verifyRequestBody);
employeeRouter.use('/:employeeId', EmployeeMiddleware.verifyEmployeeId);

employeeRouter.get('/', EmployeeController.getAllEmployeesHandler);
employeeRouter.get('/:employeeId', EmployeeController.getEmployeeHandler);
employeeRouter.post('/', EmployeeController.createEmployeeHandler);
employeeRouter.put('/:employeeId', EmployeeController.updateEmployeesHandler);
employeeRouter.delete('/:employeeId', EmployeeController.deleteEmployeeHandler);

export default employeeRouter;
