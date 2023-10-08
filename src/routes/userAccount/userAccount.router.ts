import { Router } from 'express';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';
import UserAccountMiddleware from '../../controllers/userAccount/userAccountMiddleware.controller';
import AuthMiddleware from '../../controllers/auth/authMiddleware.controller';
import { UserAccountType } from '../../models/userAccount/userAccount.enum';

const userAccountRouter = Router();

userAccountRouter.use(UserAccountMiddleware.verifyRequestBody);

userAccountRouter.post(
    '/',
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
    UserAccountController.createUserAccount,
);

userAccountRouter.get(
    '/employee/:employeeId',
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
    UserAccountController.getUserAccountByEmployeeId,
);

userAccountRouter.put(
    '/employee/:employeeId',
    AuthMiddleware.authorized([UserAccountType.ADMIN]),
    UserAccountController.updateUserAccount,
);

export default userAccountRouter;
