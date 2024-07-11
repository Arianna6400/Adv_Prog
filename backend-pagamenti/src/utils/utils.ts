// Funzione per validare l'ID
export const isValidId = (id: number): boolean => !isNaN(id) && id > 0;
