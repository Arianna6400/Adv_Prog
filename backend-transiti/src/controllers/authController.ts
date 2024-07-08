import { Request, Response, NextFunction } from 'express';
import User from '../models/utente';
import { generateToken } from '../utils/jwt';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Invalid credentials'));
    }

    const token = generateToken({ email: user.email, ruolo: user.ruolo });
    res.status(200).json({ token });
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Server error'));
  }
};