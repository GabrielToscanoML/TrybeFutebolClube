import { ILeaderBoard } from '../interfaces';
import leaderBoardResult, { resultHomeAndAway } from '../utils.ts/matchesInfos';

export default class LeaderBoardService {
  public getAll = async (data: 'home' | 'away'): Promise<ILeaderBoard[]> => {
    const result: ILeaderBoard[] = await leaderBoardResult(data);
    return result;
  };

  public getAllLeaderBoard = async (): Promise<ILeaderBoard[]> => {
    const homeLeaderboard: ILeaderBoard[] = await leaderBoardResult('home');
    const awayLeaderboard: ILeaderBoard[] = await leaderBoardResult('away');
    const result = resultHomeAndAway(homeLeaderboard, awayLeaderboard);
    return result;
  };
}
