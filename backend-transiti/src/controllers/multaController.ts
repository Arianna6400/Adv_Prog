import { Request, Response, NextFunction } from 'express';
import multaRepository from '../repositories/multaRepository';
import transitoRepository from '../repositories/transitoRepository';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

// Controller per ottenere tutte le multe
export const getAllMulte = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const multe = await multaRepository.getAllMulte();
        res.status(200).json(multe);
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere una multa per ID
export const getMultaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const multa = await multaRepository.getMultaById(id);
        if (multa) {
            res.status(200).json(multa);
        } else {
            res.status(404).json({ message: 'Multa non trovata' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per creare una nuova multa
export const createMulta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovaMulta = await multaRepository.createMulta(req.body);
        res.status(201).json(nuovaMulta);
    } catch (error) {
        next(error);
    }
};

// Controller per aggiornare una multa esistente
export const updateMulta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await multaRepository.updateMulta(id, req.body);
        if (updated) {
            const updatedMulta = await multaRepository.getMultaById(id);
            res.status(200).json(updatedMulta);
        } else {
            res.status(404).json({ message: 'Multa non trovata' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per cancellare una multa per ID
export const deleteMulta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await multaRepository.deleteMulta(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Multa non trovata' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere tutte le multe non pagate di un veicolo
export const getMulteNonPagate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veicolo = req.params.veicolo;
        const multe = await multaRepository.getMulteNonPagate(veicolo);
        if (multe.length > 0) {
            res.status(200).json(multe);
        } else {
            res.status(404).json({ message: 'Nessuna multa non pagata trovata per questo veicolo' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per scaricare un bollettino di pagamento in formato PDF con un QR-code
export const downloadBollettino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const multa = await multaRepository.getMultaById(id);
        if (multa) {
            const transito = await transitoRepository.getTransitoById(multa.transito);
            if (!transito) {
                return res.status(404).json({ message: 'Transito non trovato' });
            }

            const targa = transito.veicolo; // Associa la targa del veicolo al transito

            // Genera il QR-code stringa
            const qrString = `${multa.uuid_pagamento}|${multa.id_multa}|${targa}|${multa.importo_token}`;
            const qrCodeUrl = await QRCode.toDataURL(qrString);

            // Crea un nuovo documento PDF
            const doc = new PDFDocument({ margin: 50 });

            // Imposta il tipo di risposta come PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=bollettino_${multa.id_multa}.pdf`);

            // Layout per il PDF
            doc.fontSize(25).text('Bollettino di Pagamento', { align: 'center', underline: true });
            doc.moveDown(2);
            doc.fontSize(20).text(`Targa: ${targa}`, { align: 'left' });
            doc.fontSize(20).text(`Importo: ${multa.importo_token}€`, { align: 'left' });
            doc.moveDown(2);

            // Aggiunge QR-code al PDF
            const qrImageSize = 150;
            doc.image(qrCodeUrl, {
                fit: [qrImageSize, qrImageSize],
                align: 'center',
                valign: 'center'
            });
            doc.moveDown(2);

            // Finalizza il documento PDF e lo invia come risposta
            doc.pipe(res);
            doc.end();
        } else {
            res.status(404).json({ message: 'Multa non trovata' });
        }
    } catch (error) {
        next(error);
    }
};
