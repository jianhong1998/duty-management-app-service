import Prettify from '../prettifyType/prettify.type';
import { ILoginFailureResult, ILoginSuccessResult } from './loginResult.model';

interface ILoginSuccessResponse extends ILoginSuccessResult {}

interface ILoginFailureResponse
    extends Pick<ILoginFailureResult, 'isLoginSuccess'> {
    errorMessage: string;
    statusCode: number;
}

type ILoginResponse = Prettify<ILoginSuccessResponse | ILoginFailureResponse>;

export default ILoginResponse;
