// Controller di autenticazione per generare il JWT tramite email e ruolo dell'utente

import { Request, Response } from 'express';
import User from '../models/utente';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ email: user.email, ruolo: user.ruolo });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
