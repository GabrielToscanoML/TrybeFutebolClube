import { Request, Response } from 'express';
import { ILeaderBoard } from '../interfaces';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  private _leaderBoardService = new LeaderBoardService();

  public findAll = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const leaderboardTeams: ILeaderBoard[] = await this._leaderBoardService.getAll();
    const result = leaderboardTeams.sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints);
    return res.status(200).json(result);
  };
}
