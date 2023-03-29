import { RowDataPacket } from 'mysql2';
import { ModelStatic } from 'sequelize';
import createToken from '../auth/authFunctions';
import UserModel from '../database/models/UserModel';
import { ILogin, IUser } from '../interfaces';

export default class UserService {
  private _users: ModelStatic<UserModel> = UserModel;

  public getAll = async (): Promise<IUser[]> => {
    const result: IUser[] = await this._users.findAll();
    return result;
  };

  public getById = async (id: number): Promise<IUser> => {
    const result = <IUser & RowDataPacket> await this._users.findOne({ where: { id } });
    return result;
  };

  public login = async (Login: ILogin) => {
    const result = createToken(Login);
    return result;
  };
}
