import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { JwtPayload } from 'jsonwebtoken';
import multaRepository from '../repositories/multaRepository';
import { StatusCodes } from "http-status-codes";

/**
 * Funzione per ottenere tutte le multe associate all'utente autenticato.
 */
export const getMulteByUtente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Estrae l'ID utente dal payload JWT
        const { id } = (req as any).user as JwtPayload;
        // Recupera tutte le multe dell'utente dal repository
        const multe = await multaRepository.getMulteByUtente(id);
        res.status(StatusCodes.OK).json(multe);
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per scaricare il bollettino di una multa in formato PDF.
 */
export const downloadBollettino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const utenteId = (req as any).user.id;

        const result = await multaRepository.getMultaWithDetailsByUUID(uuid, utenteId);

        if (result) {
            const { multa, transito, veicolo } = result;
            const qrString = `${multa.uuid_pagamento}|${multa.id_multa}|${veicolo.targa}|${multa.importo_token}`;
            const qrCodeUrl = await generateQRCode(qrString);

            createPDF(res, { multa, transito, veicolo, qrCodeUrl });
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, `Multa con uuid ${uuid} non trovata`));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del bollettino'));
    }
};

/**
 * Crea un PDF con le informazioni fornite e lo invia come risposta.
 * 
 * @param {Response} res La risposta HTTP.
 * @param {Object} data I dati per popolare il PDF.
 * @param {Object} data.multa Le informazioni sulla multa.
 * @param {Object} data.transito Le informazioni sul transito.
 * @param {Object} data.veicolo Le informazioni sul veicolo.
 * @param {string} data.qrCodeUrl L'URL del QR code generato.
 */

const createPDF = (res: Response, data: { multa: any, transito: any, veicolo: any, qrCodeUrl: string }) => {
    const { multa, transito, veicolo, qrCodeUrl } = data;
    
    // Formatta la data del transito e altre informazioni
    const dataTransito = transito.data_ora.toLocaleString();
    const targa = veicolo.targa;
    const statoPagamento = multa.pagata ? 'Pagata' : 'Non pagata';

    // Determina il colore dell'intestazione in base allo stato del pagamento
    const headerColor = multa.pagata ? '#4CAF50' : '#FF0000';

    // Creazione PDF e impostazionee del layout
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bollettino_${multa.id_multa}.pdf`);

    const headerHeight = 50;
    doc.rect(0, 0, doc.page.width, headerHeight).fill(headerColor).stroke();
    doc.fill('#fff').fontSize(25).text('Bollettino di Pagamento', 0, headerHeight / 4, { align: 'center' });
    doc.moveDown(3);

    const sideMargin = 50;
    doc.fill('#000').fontSize(20);
    doc.text(`Targa: ${targa}`, sideMargin, doc.y, { align: 'left' });
    doc.text(`Data Transito: ${dataTransito}`, sideMargin, doc.y, { align: 'left' });
    doc.text(`Importo Token: ${multa.importo_token}`, sideMargin, doc.y, { align: 'left' });
    doc.text(`Stato Pagamento: ${statoPagamento}`, sideMargin, doc.y, { align: 'left' });
    doc.moveDown(2);

    // Aggiunge il QR code al PDF
    const qrImageSize = 150;
    doc.image(qrCodeUrl, {
        fit: [qrImageSize, qrImageSize],
        align: 'center',
        valign: 'center'
    });

    // Pipe del documento PDF nella risposta HTTP
    doc.pipe(res);
    doc.end();
};

/**
 * Genera un QR code a partire da una stringa.
 * 
 * @param {string} qrString La stringa da codificare nel QR code.
 * @returns {Promise<string>} Una Promise che risolve con l'URL del QR code generato.
 */
const generateQRCode = async (qrString: string): Promise<string> => {
    try {
        return await QRCode.toDataURL(qrString);
    } catch (error) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Errore nella generazione del QR code');
    }
};
