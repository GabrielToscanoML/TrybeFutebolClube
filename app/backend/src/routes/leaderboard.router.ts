import { Router } from 'express';
import LeaderBoardController from '../controller/leaderboard.controller';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.findAllHome);
router.get('/away', leaderBoardController.findAllAway);
router.get('/', leaderBoardController.findAll);

export default router;
