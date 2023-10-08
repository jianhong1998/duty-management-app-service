import { Router } from 'express';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';
import UserAccountMiddleware from '../../controllers/userAccount/userAccountMiddleware.controller';

const userAccountRouer = Router();

userAccountRouer.use(UserAccountMiddleware.verifyRequestBody);

userAccountRouer.post('/', UserAccountController.createUserAccount);

export default userAccountRouer;
