// Generazione e validazione dei JWT

import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      return null; 
    }
    return decoded as JwtPayload;
  } catch (e) {
    return null;
  }
};
