import { Router } from 'express';
import MatchController from '../controller/match.controller';
import validateToken from '../middlewares/validateToken';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);
router.patch('/:id/finish', validateToken, matchController.finishMatch);

export default router;
