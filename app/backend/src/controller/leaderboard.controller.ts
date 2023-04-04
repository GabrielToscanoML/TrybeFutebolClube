import { Request, Response } from 'express';
import { ILeaderBoard } from '../interfaces';
import LeaderBoardService from '../services/leaderboard.service';
import { sortLeaderBoard } from '../utils.ts/matchesInfos';

export default class LeaderBoardController {
  private _leaderBoardService = new LeaderBoardService();

  public findAllHome = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const leaderboardTeams: ILeaderBoard[] = await this._leaderBoardService.getAll('home');
    const result = sortLeaderBoard(leaderboardTeams);
    return res.status(200).json(result);
  };

  public findAllAway = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const leaderboardTeams: ILeaderBoard[] = await this._leaderBoardService.getAll('away');
    const result = sortLeaderBoard(leaderboardTeams);
    return res.status(200).json(result);
  };

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const leaderboardTeams: ILeaderBoard[] = await this._leaderBoardService.getAllLeaderBoard();
    const result = sortLeaderBoard(leaderboardTeams);
    return res.status(200).json(result);
  };
}
