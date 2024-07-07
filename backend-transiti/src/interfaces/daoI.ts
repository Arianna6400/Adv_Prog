export interface DAO<T, K> {
    getAll(): Promise<T[]>;
    getById(id: K): Promise<T | null>;
    create(item: Partial<T>): Promise<T>;
    update(id: K, item: Partial<T>): Promise<[number, T[]]>;
    delete(id: K): Promise<number>;
  }