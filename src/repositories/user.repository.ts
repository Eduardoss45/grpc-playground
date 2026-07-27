import { User } from '../types/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(limit?: number, offset?: number): Promise<User[]>;
  delete(id: string): Promise<void>;
}
