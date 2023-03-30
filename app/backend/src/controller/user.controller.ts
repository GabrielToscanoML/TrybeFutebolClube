import { Request, Response } from 'express';
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
}
