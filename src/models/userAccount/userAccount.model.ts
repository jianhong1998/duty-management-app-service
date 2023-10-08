import IEmployee from '../employee/employee.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import { UserAccountStatus, UserAccountType } from './userAccount.enum';

export default interface IUserAccount {
    id: number;
    employeeId: number;
    emailAddress: string;
    password: string;
    accountType: UserAccountType;
    accountStatus: UserAccountStatus;
    createdAt?: Date;
    updatedAt?: Date;
    employeeDBModel?: EmployeeDBModel;
    employee?: IEmployee;
}

export interface IUserAccountCreation
    extends Omit<
        IUserAccount,
        | 'id'
        | 'accountStatus'
        | 'createdAt'
        | 'updatedAt'
        | 'employee'
        | 'employeeDBModel'
    > {}
