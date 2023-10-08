import { IEmployeeCreation } from '../employee/employee.model';
import Prettify from '../prettifyType/prettify.type';
import { IUserAccountCreation } from './userAccount.model';

type IUserRegisterFormData = Prettify<
    IEmployeeCreation & Omit<IUserAccountCreation, 'employeeId' | 'password'>
>;

export default IUserRegisterFormData;
