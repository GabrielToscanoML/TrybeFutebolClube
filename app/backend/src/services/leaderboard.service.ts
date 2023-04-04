import { ILeaderBoard } from '../interfaces';
import leaderBoardResult from '../utils.ts/matchesInfos';

export default class LeaderBoardService {
  public getAll = async (data: 'home' | 'away'): Promise<ILeaderBoard[]> => {
    const result: ILeaderBoard[] = await leaderBoardResult(data);
    return result;
  };
}
