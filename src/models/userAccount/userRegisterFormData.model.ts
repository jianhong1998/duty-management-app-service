import { IEmployeeCreation } from '../employee/employee.model';
import Prettify from '../prettifyType/prettify.type';
import { IUserAccountCreation } from './userAccount.model';

type IUSerRegisterFormData = Prettify<
    IEmployeeCreation & Omit<IUserAccountCreation, 'employeeId'>
>;

export default IUSerRegisterFormData;
