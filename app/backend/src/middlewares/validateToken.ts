import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import authFunctions from '../auth/authFunctions';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    if (typeof authorization === 'string') {
      const { data } = <JwtPayload> authFunctions.verifyToken(authorization);
      if (!data) return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token must be a valid token',
    });
  }
};

export default validateToken;
