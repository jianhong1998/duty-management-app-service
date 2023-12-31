import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IUserAccount from '../../models/userAccount/userAccount.model';
import UserAccountVerificationService from '../../service/userAccount/userAccountVerification.service';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import IUserRegisterFormData from '../../models/userAccount/userRegisterFormData.model';

export default class UserAccountMiddleware {
    static verifyRequestBody: RequestHandler<
        undefined,
        StandardResponse<IUserAccount>,
        IUserRegisterFormData,
        undefined
    > = (req, res, next) => {
        const body = req.body;

        if (
            (req.method.toLowerCase() === 'post' ||
                req.method.toLowerCase() === 'put') &&
            !UserAccountVerificationService.isUserRegisterFormData(body)
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid request body',
            );
        }

        next();
    };

    static verifyEmailInRequestBody: RequestHandler<
        any,
        StandardResponse<any>,
        { email: string }
    > = (req, res, next) => {
        if (!('email' in req.body) || typeof req.body.email !== 'string') {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid email address.',
            );
        }

        next();
    };

    static verifyNewPasswordInBody: RequestHandler<
        undefined,
        StandardResponse<any>,
        { newPassword: string; oldPassword: string }
    > = (req, res, next) => {
        if (
            !('newPassword' in req.body) ||
            typeof req.body.newPassword !== 'string' ||
            !('oldPassword' in req.body) ||
            typeof req.body.oldPassword !== 'string'
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid request body',
            );
        }

        next();
    };
}
