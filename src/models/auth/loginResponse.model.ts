interface ILoginSuccessResponse {
    isLoginSuccess: true;
    token: string;
    name: string;
}

interface ILoginFailureResponse {
    isLoginSuccess: false;
    errorMessage: string;
    statusCode: number;
}

type ILoginResponse = ILoginSuccessResponse | ILoginFailureResponse;

export default ILoginResponse;
