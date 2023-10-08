import { Router } from 'express';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';
import UserAccountMiddleware from '../../controllers/userAccount/userAccountMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const userAccountRouer = Router();

userAccountRouer.use(UserAccountMiddleware.verifyRequestBody);

userAccountRouer.post(
    '/',
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
    UserAccountController.createUserAccount,
);

export default userAccountRouer;
