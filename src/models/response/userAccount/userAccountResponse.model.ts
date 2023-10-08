import IEmployee from '../../employee/employee.model';
import Prettify from '../../prettifyType/prettify.type';
import IUserAccount from '../../userAccount/userAccount.model';
import IUserRegisterFormData from '../../userAccount/userRegisterFormData.model';

export type IUpdateUserAccountResponse = Prettify<
    Pick<IEmployee, 'name' | 'contactNumber' | 'employmentType' | 'role'> &
        Pick<IUserAccount, 'accountType' | 'emailAddress'>
>;

export type IGetUserAccountResponse = IUserRegisterFormData;
