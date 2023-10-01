import { RequestHandler } from 'express';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import { UserAccountType } from '../../models/userAccount/userAccountType.enum';
import TokenService from '../../service/login/token.service';
import UserAccountService from '../../service/userAccount/userAccount.service';

export default class AuthMiddleware {
    private static readonly MISSING_TOKEN_ERROR =
        'No token received in request header.';

    private static readonly UNAUTHORIZED_ERROR = 'Token is invalid or expired.';

    private static readonly USER_UNAUTHENTICATE_ERROR =
        'User is not allowed to visit this resource.';

    static authorized(
        authorizedAccountTypes: UserAccountType[],
    ): RequestHandler {
        return async (req, res, next) => {
            const { authorization } = req.headers;

            if (typeof authorization === 'undefined') {
                return ErrorHandler.sendErrorResponse(
                    res,
                    401,
                    this.MISSING_TOKEN_ERROR,
                );
            }

            const token = authorization.split(' ')[1];

            if (typeof token !== 'string' || token === null) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    401,
                    this.MISSING_TOKEN_ERROR,
                );
            }

            if (!TokenService.verifyToken(token)) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    401,
                    this.UNAUTHORIZED_ERROR,
                );
            }

            const { userId } = TokenService.decodeToken(token);

            const user = await UserAccountService.getUserAccount({
                id: userId,
            });

            if (user === null) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    401,
                    this.UNAUTHORIZED_ERROR,
                );
            }

            if (!authorizedAccountTypes.includes(user.accountType)) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    403,
                    this.USER_UNAUTHENTICATE_ERROR,
                );
            }

            next();
        };
    }
}
