/**
 * Interfaccia per la definizione delle CRUD generiche
 */
export interface DAO<T, K> { // T=entità, K=chiave
    getAll(): Promise<T[]>;
    getById(id: K): Promise<T | null>;
    create(item: Partial<T>): Promise<T>; // Partial -> non tutti i campi dell'entità T devono essere presenti
    update(id: K, item: Partial<T> | null): Promise<[number, T[]]>; // number -> righe interessante dall'aggiornamento
    delete(id: K): Promise<number>; // primessa sul numero di righe eliminate
  }