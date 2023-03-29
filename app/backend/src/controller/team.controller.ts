// import { Request, Response } from 'express';
// import teamsService from '../services/teams.service';

// const getAll = async (req: Request, res: Response) => {
//   const teams = await teamsService.getAll();
//   return res.status(200).json(teams);
// };

// const teamController = { getAll };

// export default teamController;
import { Request, Response } from 'express';
import { ITeams } from '../interfaces';
import TeamService from '../services/teams.service';

class TeamController {
  private _teams = new TeamService();

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const result: ITeams[] = await this._teams.getAll();
    return res.status(200).json(result);
  };
}

export default TeamController;
