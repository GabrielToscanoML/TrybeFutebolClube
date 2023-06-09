import { Router } from 'express';
import UserController from '../controller/user.controller';

const router = Router();

const userController = new UserController();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);

export default router;
