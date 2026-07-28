import { User } from '../../domain/user/user';

export interface UserCache {
  get(id: string): Promise<User | null>;
  set(user: User): Promise<void>;
  setMany(users: User[]): Promise<void>;
  delete(id: string): Promise<void>;
  flush(): Promise<void>;
}
