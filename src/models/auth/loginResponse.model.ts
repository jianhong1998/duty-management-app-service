import Prettify from '../prettifyType/prettify.type';
import { UserAccountType } from '../userAccount/userAccount.enum';

interface ILoginSuccessResponse {
    isLoginSuccess: true;
    token: string;
    name: string;
    accountType: UserAccountType;
}

interface ILoginFailureResponse {
    isLoginSuccess: false;
    errorMessage: string;
    statusCode: number;
}

type ILoginResponse = Prettify<ILoginSuccessResponse | ILoginFailureResponse>;

export default ILoginResponse;
