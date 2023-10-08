import Prettify from '../prettifyType/prettify.type';
import { UserAccountType } from '../userAccount/userAccount.enum';

interface ILoginSuccessResult {
    isLoginSuccess: true;
    token: string;
    name: string;
    accountType: UserAccountType;
}

interface ILoginFailureResult {
    isLoginSuccess: false;
    message: string;
}

type LoginResult = Prettify<ILoginSuccessResult | ILoginFailureResult>;

export default LoginResult;
