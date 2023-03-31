import { Request, Response } from 'express';
import { IMatch } from '../interfaces';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService = new MatchService();

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const result: IMatch[] = await this._matchService.getAll();
    return res.status(200).json(result);
  };

  // public findOne = async (
  //   req: Request,
  //   res: Response,
  // )
  // : Promise<Response | void> => {
  //   const { id } = req.params;
  //   const result: IMatch = await this._matchService.getById(Number(id));
  //   return res.status(200).json(result);
  // };
}
