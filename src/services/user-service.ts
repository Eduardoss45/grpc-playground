import { cacheEnabled } from '../config/cache';
import { UserCache } from '../cache/user.cache';
import { PostgresUserRepository } from '../repositories/postgres-user.repository';
import { User } from '../types/user';

export class UserService {
  constructor(
    private repository: PostgresUserRepository,
    private cache: UserCache
  ) {}

  async getUser(id: string) {
    if (!cacheEnabled) {
      return this.repository.findById(id);
    }

    const cached = await this.cache.get(id);

    if (cached) {
      return cached;
    }

    const user = await this.repository.findById(id);

    if (user) {
      await this.cache.set(user);
    }

    return user;
  }

  async createUser(user: User) {
    const created = await this.repository.create(user);

    if (cacheEnabled) {
      await this.cache.set(created);
    }

    return created;
  }

  async findAllUsers(limit: number, offset: number) {
    return this.repository.findAll(limit, offset);
  }

  async deleteUser(id: string) {
    await this.repository.delete(id);

    if (cacheEnabled) {
      await this.cache.delete(id);
    }
  }
}
