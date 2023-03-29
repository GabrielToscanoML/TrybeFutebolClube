import { RowDataPacket } from 'mysql2';
import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import { ITeams } from '../interfaces';

export default class TeamService {
  private _teams: ModelStatic<TeamModel> = TeamModel;

  public getAll = async (): Promise<ITeams[]> => {
    const result: ITeams[] = await this._teams.findAll();
    return result;
  };

  public getById = async (id: number): Promise<ITeams> => {
    const result = <ITeams & RowDataPacket> await this._teams.findOne({ where: { id } });
    return result;
  };
}
