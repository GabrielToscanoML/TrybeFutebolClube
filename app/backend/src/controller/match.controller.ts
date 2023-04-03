import { Request, Response } from 'express';
import { IMatch } from '../interfaces';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService = new MatchService();

  public findAll = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const q = <string> req.query.inProgress;
    const result: IMatch[] = await this._matchService.getAll();
    if (!q) {
      return res.status(200).json(result);
    }
    const resultFiltered = result.filter((match) => match.inProgress.toString() === q);
    return res.status(200).json(resultFiltered);
  };

  public finishMatch = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { id } = req.params;
    await this._matchService.finishMatch(+id);
    return res.status(200).json({ message: 'Finished' });
  };

  public updateResult = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchService.updateResult(+id, +homeTeamGoals, +awayTeamGoals);
    return res.status(200).json({ message: 'Finished' });
  };

  public createMatch = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const allMatches: IMatch[] = await this._matchService.getAll();
    const newMatch = {
      id: allMatches.length + 1,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };
    await this._matchService.createMatch(newMatch);
    return res.status(201).json(newMatch);
  };
}
