import { Router } from 'express';
import UserAccountController from '../../controllers/userAccount/userAccount.controller';

const userAccountRouer = Router();

userAccountRouer.post('/', UserAccountController.createUserAccount);

export default userAccountRouer;
