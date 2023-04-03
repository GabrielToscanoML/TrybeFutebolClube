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

  public finishMatch = async (id: number) => {
    await this._matches.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  };

  public updateResult = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    await this._matches.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });
  };
}
