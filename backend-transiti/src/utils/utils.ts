// Funzione per validare l'ID
export const isValidId = (id: number): boolean => !isNaN(id) && id > 0;

// Funzione per validare la targa del veicolo
export const isValidTarga = (targa: string): boolean => {
    const targaRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    return targaRegex.test(targa);
};