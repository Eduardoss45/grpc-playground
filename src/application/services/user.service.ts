import { randomUUID } from 'node:crypto';

import { CreateUserInput, User } from '../../domain/user/user';
import { UserCache } from '../ports/user.cache';
import { UserRepository } from '../ports/user.repository';

type UserServiceOptions = {
  cacheEnabled: boolean;
};

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly cache: UserCache,
    private readonly options: UserServiceOptions
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const created = await this.repository.create({
      id: randomUUID(),
      name: input.name,
      email: input.email,
    });

    if (this.options.cacheEnabled) {
      await this.cache.set(created);
    }

    return created;
  }

  async getUser(id: string): Promise<User | null> {
    if (!this.options.cacheEnabled) {
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

  async listUsers(limit: number, offset: number): Promise<User[]> {
    return this.repository.findAll(limit, offset);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);

    if (this.options.cacheEnabled) {
      await this.cache.delete(id);
    }
  }

  async seedUsers(totalUsers: number, batchSize: number, onBatch?: (total: number) => void): Promise<string[]> {
    const ids: string[] = [];

    for (let i = 0; i < totalUsers; i += batchSize) {
      const users: User[] = [];

      for (let j = 0; j < batchSize && i + j < totalUsers; j++) {
        const index = i + j;
        const id = randomUUID();

        ids.push(id);
        users.push({
          id,
          name: `User ${index}`,
          email: `user${index}@gmail.com`,
        });
      }

      await this.repository.createMany(users);
      onBatch?.(Math.min(i + batchSize, totalUsers));
    }

    return ids;
  }

  async warmCache(batchSize: number, onBatch?: (total: number) => void): Promise<number> {
    if (!this.options.cacheEnabled) {
      return 0;
    }

    let offset = 0;
    let total = 0;

    while (true) {
      const users = await this.repository.findAll(batchSize, offset);

      if (!users.length) {
        break;
      }

      await this.cache.setMany(users);

      total += users.length;
      offset += batchSize;
      onBatch?.(total);
    }

    return total;
  }

  async cleanUsers(): Promise<{ postgresCleaned: boolean; redisCleaned: boolean }> {
    await this.repository.truncate();

    if (this.options.cacheEnabled) {
      await this.cache.flush();
    }

    return {
      postgresCleaned: true,
      redisCleaned: this.options.cacheEnabled,
    };
  }
}
