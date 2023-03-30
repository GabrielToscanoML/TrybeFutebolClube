import { Router } from 'express';
import validateLoginData, { validateEmail } from '../middlewares/validateLoginData';
import UserController from '../controller/user.controller';

const router = Router();

const userController = new UserController();

router.post('/', validateLoginData, validateEmail, userController.login);

export default router;
