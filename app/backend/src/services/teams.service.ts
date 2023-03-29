// import { ITeams } from '../interfaces';
// import teamsModel from '../models/team.model';

// const getAll = async (): Promise<ITeams[]> => {
//   const teams = await teamsModel.getAll();
//   return teams;
// };

// const teamsService = { getAll };

// export default teamsService;
import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import { ITeams } from '../interfaces';

export default class TeamService {
  private _teams: ModelStatic<TeamModel> = TeamModel;

  public getAll = async (): Promise<ITeams[]> => {
    const result: ITeams[] = await this._teams.findAll();
    return result;
  };
}
