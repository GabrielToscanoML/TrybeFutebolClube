import { Router } from 'express';
import MatchController from '../controller/match.controller';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);

export default router;
