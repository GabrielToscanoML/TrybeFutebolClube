import { Router } from 'express';
import validateLoginData from '../middlewares/validateLoginData';
import UserController from '../controller/user.controller';

const router = Router();

const userController = new UserController();

router.post('/', validateLoginData, userController.login);

export default router;
