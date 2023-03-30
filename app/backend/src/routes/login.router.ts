import { Router } from 'express';
import validateLoginData, { validateEmail } from '../middlewares/validateLoginData';
import UserController from '../controller/user.controller';
import validateToken from '../middlewares/validateToken';

const router = Router();

const userController = new UserController();

router.post('/', validateLoginData, validateEmail, userController.login);
router.get('/role', validateToken, userController.getRole);

export default router;
