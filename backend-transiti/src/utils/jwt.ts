import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ErrorFactory, ErrorTypes } from './errorFactory';

/**
 * enerazione e validazione dei JWT
 */

dotenv.config();

const secret = process.env.JWT_SECRET as string; //Estrae la variabile d’ambiente JWT_SECRET

/**
 * Genera il token con durata 1 ora
 */
export const generateToken = (payload: object): string => {
  try {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  } catch (e) {
    throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella generazione del token');
  }
};

/**
 * verifica il token
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      return null;
    }
    return decoded as JwtPayload; // Se la verifica ha successo ritorna il payload decodificato
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      throw ErrorFactory.createError(ErrorTypes.TokenExpired, 'Token scaduto');
    } else if (e instanceof jwt.JsonWebTokenError) {
      throw ErrorFactory.createError(ErrorTypes.JsonWebTokenError, 'Token non valido');
    } else {
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella verifica del token');
    }
  }
};