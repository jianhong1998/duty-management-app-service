import { Request, Response } from 'express';
import LoginService from '../../service/login/login.service';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import StandardResponse from '../../models/response/standardResponse.model';
import ILoginRequest from '../../models/auth/loginRequest.model';
import ILoginResponse from '../../models/auth/loginResponse.model';
import TokenService from '../../service/login/token.service';

export default class AuthController {
    private static readonly ERROR_MESSAGE_401 =
        'Token is invalid or expired, please login again.';

    static async login(
        req: Request<undefined, any, ILoginRequest>,
        res: Response<StandardResponse<ILoginResponse>>,
    ) {
        const { email, password } = req.body;

        if (typeof email === 'undefined' || typeof password === 'undefined') {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid request body',
            );
        }

        try {
            const result = await LoginService.login(email, password);

            switch (result.isLoginSuccess) {
                case true:
                    return res.status(200).send({
                        isSuccess: true,
                        data: {
                            isLoginSuccess: true,
                            token: result.token,
                            name: result.name,
                            accountType: result.accountType,
                        },
                    });
                case false:
                    return ErrorHandler.sendErrorResponse(
                        res,
                        400,
                        result.message,
                    );
                default:
                    throw new Error(`result.isLoginSuccess is not boolean`);
            }
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);

            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    static verifyToken = (
        req: Request,
        res: Response<StandardResponse<boolean>>,
    ) => {
        const { authorization } = req.headers;

        if (typeof authorization === 'undefined') {
            return ErrorHandler.sendErrorResponse(
                res,
                401,
                this.ERROR_MESSAGE_401,
            );
        }

        const result = TokenService.verifyToken(authorization.split(' ')[1]);

        if (!result) {
            return ErrorHandler.sendErrorResponse(
                res,
                401,
                this.ERROR_MESSAGE_401,
            );
        }

        res.status(200).send({
            isSuccess: true,
            data: true,
        });
    };
}
