import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (data: ILogin) => jwt.sign({ data }, secret, JWT_CONFIG);

// const verifyToken = (token) => jwt.verify(token, secret);

// const authFunctions = { createToken };

export default createToken;
