import Prettify from '../prettifyType/prettify.type';
import {
    UserAccountStatus,
    UserAccountType,
} from '../userAccount/userAccount.enum';

export interface ILoginSuccessResult {
    isLoginSuccess: true;
    token: string;
    name: string;
    accountType: UserAccountType;
    accountStatus: UserAccountStatus;
}

export interface ILoginFailureResult {
    isLoginSuccess: false;
    message: string;
}

type LoginResult = Prettify<ILoginSuccessResult | ILoginFailureResult>;

export default LoginResult;
