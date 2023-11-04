import { Router } from 'express';
import AdminEmployeeController from '../../controllers/employee/employee.admin.controller';
import EmployeeMiddleware from '../../controllers/employee/employeeMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';
import PaginationMiddleware from '../../controllers/pagination/paginationMiddleware.controller';

const adminEmployeeRouter = Router();

adminEmployeeRouter.use(AuthMiddleware.authorized([UserAccountType.ADMIN]));

adminEmployeeRouter.use('/', EmployeeMiddleware.verifyRequestBody);

adminEmployeeRouter.get(
    '/',
    PaginationMiddleware.verifyPaginationQuery,
    EmployeeMiddleware.verifySortingInRequestQuery,
    AdminEmployeeController.getAllEmployeesHandler,
);

adminEmployeeRouter.post('/', AdminEmployeeController.createEmployeeHandler);

adminEmployeeRouter.patch(
    '/reactivate/:employeeId',
    EmployeeMiddleware.verifyEmployeeId,
    AdminEmployeeController.reactivateEmployeeHandler,
);

adminEmployeeRouter.use('/:employeeId', EmployeeMiddleware.verifyEmployeeId);

adminEmployeeRouter.get(
    '/:employeeId',
    AdminEmployeeController.getEmployeeHandler,
);
adminEmployeeRouter.put(
    '/:employeeId',
    AdminEmployeeController.updateEmployeesHandler,
);
adminEmployeeRouter.delete(
    '/:employeeId',
    AdminEmployeeController.deleteEmployeeHandler,
);

export default adminEmployeeRouter;
