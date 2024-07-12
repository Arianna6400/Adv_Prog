import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string; // Estrae la variabile d’ambiente JWT_SECRET

/**
 * Genera il token con durata 1 ora
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

/**
 * Verifica il token
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      return null; 
    }
    return decoded as JwtPayload; // Se la verifica ha successo ritorna il payload decodificato
  } catch (e) {
    return null;
  }
};
