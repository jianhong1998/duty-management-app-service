import { Router } from 'express';
import AuthController from '../../controllers/auth/auth.controller';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';
import UserAccountMiddleware from '../../controllers/userAccount/userAccountMiddleware.controller';

const authRouter = Router();

authRouter.get('/', AuthController.verifyToken);
authRouter.post('/login', AuthController.login);
authRouter.post(
    '/forget-password',
    UserAccountMiddleware.verifyEmailInRequestBody,
    UserAccountController.forgetPasswordHandler,
);

export default authRouter;
