import * as bcrypt from 'bcryptjs';
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

  public getByEmail = async (email: string): Promise<IUser[]> => {
    const result = <IUser[] & RowDataPacket> await this._users.findAll({ where: { email } });
    return result;
  };

  public login = async (Login: ILogin) => {
    const { email } = Login;
    const verifyUser = await this.getByEmail(email);
    if (verifyUser.length === 0 || !bcrypt.compareSync(Login.password, verifyUser[0].password)) {
      return 'Error';
    }
    const result = createToken(Login);
    return result;
  };
}
