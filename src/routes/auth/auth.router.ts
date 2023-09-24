import { Router } from 'express';
import AuthController from '../../controllers/auth/auth.controller';

const authRouter = Router();

authRouter.get('/', AuthController.verifyToken);
authRouter.post('/login', AuthController.login);

export default authRouter;
