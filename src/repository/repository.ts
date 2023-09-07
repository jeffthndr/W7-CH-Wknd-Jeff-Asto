/* eslint-disable no-unused-vars */

export interface Repository<T extends { id: unknown }> {
  // En esta linea se dice que el repositorio es de tipo T que extiende a una propiedad "id" que de momento es de tipo unknown.
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>; // En esta linea getbyid tiene como parametro un "id" que sera de tipo array T y almacenara "ids"
  search?({ key, value }: { key: string; value: unknown }): Promise<T[]>;
  create(newData: Omit<T, 'id'>): Promise<T>;
  update(id: T['id'], newData: Partial<T>): Promise<T>; // Partial sirve para solo usar una parte de T y no todas sus propiedades
  delete(id: T['id']): Promise<void>;
}
