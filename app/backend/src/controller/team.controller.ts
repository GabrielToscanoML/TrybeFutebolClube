import { Request, Response } from 'express';
import { ITeams } from '../interfaces';
import TeamService from '../services/teams.service';

class TeamController {
  private _teamsService = new TeamService();

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const result: ITeams[] = await this._teamsService.getAll();
    return res.status(200).json(result);
  };

  public findOne = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { id } = req.params;
    const result: ITeams = await this._teamsService.getById(Number(id));
    return res.status(200).json(result);
  };
}

export default TeamController;
