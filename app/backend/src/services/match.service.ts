// import { RowDataPacket } from 'mysql2';
import { ModelStatic } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { IMatch } from '../interfaces';

export default class MatchService {
  private _matches: ModelStatic<MatchModel> = MatchModel;

  public getAll = async (): Promise<IMatch[]> => {
    const result: IMatch[] = await this._matches.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return result;
  };

  // public getById = async (id: number): Promise<IMatch> => {
  //   const result = <IMatch & RowDataPacket> await this._matches.findOne({ where: { id } });
  //   return result;
  // };
}
