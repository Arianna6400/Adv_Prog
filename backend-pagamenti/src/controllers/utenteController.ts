import { Request, Response, NextFunction } from 'express';
import Utente from '../models/utente';
import transitiService from '../utils/service';

// Ricarica credito (solo admin)
export const ricaricaCredito = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, importo } = req.body;
    const utente = await Utente.findByPk(id);
    if (!utente) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    utente.token_rimanenti += importo;
    await utente.save();
    res.status(200).json({ message: 'Credito ricaricato con successo', credito: utente.token_rimanenti });
  } catch (error) {
    next(error);
  }
};

// Verifica credito utente
export const verificaCredito = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const utente = await Utente.findByPk(id);
    if (!utente) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json({ credito: utente.token_rimanenti });
  } catch (error) {
    next(error);
  }
};

// Pagamento multa dato uuid pagamento
export const pagaMulta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_pagamento, importo } = req.body;
    const multa = await transitiService.getMultaById(id_pagamento);
    if (!multa) {
      return res.status(404).json({ message: 'Multa non trovata' });
    }
    const utente = await Utente.findByPk(multa.transito);
    if (!utente) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    if (utente.token_rimanenti < importo) {
      return res.status(400).json({ message: 'Credito insufficiente' });
    }
    utente.token_rimanenti -= importo;
    multa.pagata = true;
    await utente.save();
    await multa.save();
    res.status(200).json({ message: 'Multa pagata con successo', credito: utente.token_rimanenti });
  } catch (error) {
    next(error);
  }
};
