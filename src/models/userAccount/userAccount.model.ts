import IEmployee from '../employee/employee.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import { UserAccountType } from './userAccountType.enum';

export default interface IUserAccount {
    id: number;
    employeeId: number;
    emailAddress: string;
    password: string;
    accountType: UserAccountType;
    createdAt?: Date;
    updatedAt?: Date;
    employeeDBModel?: EmployeeDBModel;
    employee?: IEmployee;
}
