import { IEmployeeCreation } from '../employee/employee.model';
import { IUserAccountCreation } from './userAccount.model';

export default interface IUserRegisterFormData
    extends IEmployeeCreation,
        Omit<IUserAccountCreation, 'employeeId'> {}
