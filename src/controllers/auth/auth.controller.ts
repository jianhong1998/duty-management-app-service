import { Request, Response } from 'express';
import LoginService from '../../service/login/login.service';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import StandardResponse from '../../models/response/standardResponse.model';
import ILoginRequest from '../../models/auth/loginRequest.model';
import ILoginResponse from '../../models/auth/loginResponse.model';

export default class AuthController {
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
}
