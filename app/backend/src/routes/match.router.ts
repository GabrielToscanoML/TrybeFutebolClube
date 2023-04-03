import { Router } from 'express';
import MatchController from '../controller/match.controller';
import validateToken from '../middlewares/validateToken';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);
router.patch('/:id/finish', validateToken, matchController.finishMatch);
router.patch('/:id', validateToken, matchController.updateResult);
router.post('/', validateToken, matchController.createMatch);

export default router;
