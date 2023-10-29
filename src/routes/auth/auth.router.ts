import { Router } from 'express';
import AuthController from '../../controllers/auth/auth.controller';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';
import UserAccountMiddleware from '../../controllers/userAccount/userAccountMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const authRouter = Router();

authRouter.get('/', AuthController.verifyToken);
authRouter.post('/login', AuthController.login);
authRouter.post(
    '/forget-password',
    UserAccountMiddleware.verifyEmailInRequestBody,
    UserAccountController.forgetPasswordHandler,
);
authRouter.patch(
    '/reset-password',
    AuthMiddleware.authorized([UserAccountType.ADMIN, UserAccountType.USER]),
    UserAccountMiddleware.verifyNewPasswordInBody,
    UserAccountController.resetPasswordHandler,
);

export default authRouter;
