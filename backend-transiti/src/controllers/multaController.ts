import { Request, Response, NextFunction } from 'express';
import transitoRepository from '../repositories/transitoRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import multaDao from '../dao/multaDao';

// Controller per ottenere una multa per ID
export const getMultaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const multa = await multaDao.getById(id);
        if (multa) {
            res.status(200).json(multa);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero della multa'));
    }
};

// Controller per scaricare un bollettino di pagamento in formato PDF con un QR-code
export const downloadBollettino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const multa = await multaDao.getById(id);
        if (multa) {
            const transito = await transitoRepository.getTransitoById(multa.transito);
            if (!transito) {
                return res.status(404).json({ message: 'Transito non trovato' });
            }

            const dataTransito = transito.data_ora.toLocaleString();
            const targa = transito.veicolo; // Associa la targa del veicolo al transito
            const statoPagamento = multa.pagata ? 'Pagata' : 'Non pagata';

            // Determina il colore dell'intestazione in base allo stato del pagamento
            const headerColor = multa.pagata ? '#4CAF50' : '#FF0000'; // Verde se pagata, rosso se non pagata

            // Genera il QR-code stringa
            const qrString = `${multa.uuid_pagamento}|${multa.id_multa}|${targa}|${multa.importo_token}`;
            const qrCodeUrl = await QRCode.toDataURL(qrString);

            // Crea un nuovo documento PDF
            const doc = new PDFDocument({ margin: 50 });

            // Imposta il tipo di risposta come PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=bollettino_${multa.id_multa}.pdf`);

            // Aggiunge un'intestazione
            const headerHeight = 50;
            doc.rect(0, 0, doc.page.width, headerHeight).fill(headerColor).stroke();
            doc.fill('#fff').fontSize(25).text('Bollettino di Pagamento', 0, headerHeight / 4, { align: 'center' });
            doc.moveDown(3);

            // Aggiunge informazioni di pagamento
            const sideMargin = 50;
            doc.fill('#000').fontSize(20);
            doc.text(`Targa: ${targa}`, sideMargin, doc.y, { align: 'left' });
            doc.text(`Data Transito: ${dataTransito}`, sideMargin, doc.y, { align: 'left' });
            doc.text(`Importo Token: ${multa.importo_token}`, sideMargin, doc.y, { align: 'left' });
            doc.text(`Stato Pagamento: ${statoPagamento}`, sideMargin, doc.y, { align: 'left' });
            doc.moveDown(2);

            // Aggiunge QR-code al PDF
            const qrImageSize = 150;
            doc.image(qrCodeUrl, {
                fit: [qrImageSize, qrImageSize],
                align: 'center',
                valign: 'center'
            });

            // Finalizza il documento PDF e lo invia come risposta
            doc.pipe(res);
            doc.end();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del bollettino'));
    }
};