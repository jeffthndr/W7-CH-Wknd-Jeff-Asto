/* eslint-disable no-unused-vars */

export interface Repository<T extends { id: unknown }> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>;
  search?({ key, value }: { key: string; value: unknown }): Promise<T[]>;
  create(newData: Omit<T, 'id'>): Promise<T>;
  update(id: T['id'], newData: Partial<T>): Promise<T>;
  delete(id: T['id']): Promise<void>;
}
