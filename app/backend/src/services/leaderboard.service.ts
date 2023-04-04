import { ILeaderBoard } from '../interfaces';
import leaderBoardResult from '../utils.ts/matchesInfos';

export default class LeaderBoardService {
  public getAll = async (): Promise<ILeaderBoard[]> => {
    const result: ILeaderBoard[] = await leaderBoardResult();
    return result;
  };

  // public getById = async (id: number): Promise<IUser> => {
  //   const result = <IUser & RowDataPacket> await this._users.findOne({ where: { id } });
  //   return result;
  // };

  // public getByEmail = async (email: string): Promise<IUser[]> => {
  //   const result = <IUser[] & RowDataPacket> await this._users.findAll({ where: { email } });
  //   return result;
  // };

  // public login = async (Login: ILogin) => {
  //   const { email } = Login;
  //   const verifyUser = await this.getByEmail(email);
  //   if (verifyUser.length === 0 || !bcrypt.compareSync(Login.password, verifyUser[0].password)) {
  //     return 'Error';
  //   }
  //   const result = authFunctions.createToken(Login);
  //   return result;
  // };
}
