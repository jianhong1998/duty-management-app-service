import { Router } from 'express';
import EmployeeController from '../../controllers/employee/employee.controller';

const employeeRouter = Router();

employeeRouter.get('/', EmployeeController.getEmployeeDetails);

export default employeeRouter;
