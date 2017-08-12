import { Router } from 'express';
import { userCtrl } from './controller';
import { auth } from '../../../middlewares/auth';

const userRouter = Router();

userRouter.post('/signIn', auth({ needUser: true }), userCtrl.signIn);
userRouter.post('/signUp', userCtrl.signUp);

export { userRouter };