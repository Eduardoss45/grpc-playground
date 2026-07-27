import { redis } from './redis';
import { UserCache } from './user.cache';
import { User } from '../types/user';

export class RedisUserCache implements UserCache {
  async get(id: string): Promise<User | null> {
    const data = await redis.get(`user:${id}`);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  async set(user: User): Promise<void> {
    await redis.set(`user:${user.id}`, JSON.stringify(user), {
      EX: 300,
    });
  }

  async delete(id: string): Promise<void> {
    await redis.del(`user:${id}`);
  }
}
