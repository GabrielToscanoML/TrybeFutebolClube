import { Request, Response, NextFunction } from 'express';

const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json(
      { message: 'All fields must be filled' },
    );
  }
  if (!password) {
    return res.status(400).json(
      { message: 'All fields must be filled' },
    );
  }
  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
  next();
};

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheck = emailRegex.test(email);

  if (!emailCheck) return res.status(401).json({ message: 'Invalid email or password' });
  next();
};

export default validateLoginData;
