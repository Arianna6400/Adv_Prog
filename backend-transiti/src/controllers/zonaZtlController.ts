import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
import zonaZtlRepository from '../repositories/zonaZtlRepository';
import varcoZtlRepository from '../repositories/varcoZtlRepository';

/**
 * Funzione per gestire le richieste relative alle zone ZTL.
 */
export const handleZonaZtlRequests = async (req: Request, res: Response, next: NextFunction) => {
    const { id, transiti } = req.params;

    try {
        if (id && transiti === 'transiti') {
            // Se c'è un ID e 'transiti', recupera la zona ZTL con i transiti associati
            const zonaZtlWithTransiti = await zonaZtlRepository.getZonaZtlWithTransiti(parseInt(id));
            if (zonaZtlWithTransiti) {
                return res.status(StatusCodes.OK).json(zonaZtlWithTransiti);
            } else {
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        } else if (id && !transiti) {
            // Se c'è solo l'ID, recupera la zona ZTL specifica
            const zonaZtl = await zonaZtlRepository.getZonaZtlById(parseInt(id));
            if (zonaZtl) {
                return res.status(StatusCodes.OK).json(zonaZtl);
            } else {
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        } else if (!id && !transiti) {
            // Se non c'è un ID, recupera tutte le zone ZTL
            const zoneZtl = await zonaZtlRepository.getAllZonaZtl();
            return res.status(StatusCodes.OK).json(zoneZtl);
        } else {
            // Se il parametro transiti è presente ma non è valido
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Rotta non trovata'));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per creare una nuova zona ZTL.
 */
export const createZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // normalizzo in minuscolo togliendo spazi per confrontare i nomei
        const normalizedName = (req.body.nome).replace(/\s+/g, '').toLowerCase();
        // Controlla se esiste già una zona con lo stesso nome
        const existingZona = (await zonaZtlRepository.getAllZonaZtl()).find(zona => (zona.nome).replace(/\s+/g, '').toLowerCase() === normalizedName);
        
        if (existingZona) {
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Una zona con questo nome esiste già'));
        }else{
            // Crea una nuova zona ZTL
            const nuovaZonaZtl = await zonaZtlRepository.createZonaZtl(req.body);
            res.status(StatusCodes.CREATED).json(nuovaZonaZtl);
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per aggiornare una zona ZTL esistente.
 */
export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Aggiorna la zona ZTL esistente con i dati forniti nel corpo della richiesta
        const [updated] = await zonaZtlRepository.updateZonaZtl(id, req.body);
        if (updated) {
            const updatedZonaZtl = await zonaZtlRepository.getZonaZtlById(id);
            res.status(StatusCodes.OK).json(updatedZonaZtl);
        }else{
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per cancellare una zona ZTL per ID.
 */
export const deleteZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Controlla se esistono varchi associati alla zona ZTL
        const isNotFree = await (await varcoZtlRepository.getAllVarcoZtl()).filter((varco => varco.zona_ztl === id)).length;
        if (isNotFree){
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Non è possibile eliminare una zona con varchi associati'));
        }else{
            // Cancella la zona ZTL esistente
            const deleted = await zonaZtlRepository.deleteZonaZtl(id);
            console.log
            if (deleted) {
                res.status(StatusCodes.OK).json({ message: `Zona ${id} eliminata con successo` });
            }else{
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        }
    } catch (error) {
        return next(error);
    }
};