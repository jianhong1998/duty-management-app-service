interface ILoginSuccessResult {
    isLoginSuccess: true;
    token: string;
    name: string;
}

interface ILoginFailureResult {
    isLoginSuccess: false;
    message: string;
}

type LoginResult = ILoginSuccessResult | ILoginFailureResult;

export default LoginResult;
