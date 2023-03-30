import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import authFunctions from '../auth/authFunctions';
import { ILogin, IUser } from '../interfaces';
import UserService from '../services/users.service';

export default class UserController {
  private _userService = new UserService();

  public findAll = async (
    _req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const result: IUser[] = await this._userService.getAll();
    return res.status(200).json(result);
  };

  public findOne = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { id } = req.params;
    const result: IUser = await this._userService.getById(+id);
    return res.status(200).json(result);
  };

  public login = async (
    req: Request<object, object, ILogin>,
    res: Response,
  )
  : Promise<Response | void> => {
    const { body } = req;
    const token = await this._userService.login(body);
    if (token === 'Error') return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json({ token });
  };

  public getRole = async (
    req: Request,
    res: Response,
  )
  : Promise<Response | void> => {
    const { authorization } = req.headers;
    if (typeof authorization === 'string') {
      const { data } = <JwtPayload> authFunctions.verifyToken(authorization);
      const result = await this._userService.getByEmail(data.email);
      return res.status(200).json({ role: result[0].role });
    }
    return res.status(200).json({ message: 'This is an easter Egg' });
  };
}
