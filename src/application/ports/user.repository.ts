import { User } from '../../domain/user/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  createMany(users: User[]): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(limit?: number, offset?: number): Promise<User[]>;
  delete(id: string): Promise<void>;
  truncate(): Promise<void>;
}
