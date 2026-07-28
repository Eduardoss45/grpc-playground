import { UserCache } from '../../../application/ports/user.cache';
import { User } from '../../../domain/user/user';
import { redis } from './redis.client';

const USER_CACHE_TTL_IN_SECONDS = 300;

function userCacheKey(id: string): string {
  return `user:${id}`;
}

export class RedisUserCache implements UserCache {
  async get(id: string): Promise<User | null> {
    const data = await redis.get(userCacheKey(id));

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  async set(user: User): Promise<void> {
    await redis.set(userCacheKey(user.id), JSON.stringify(user), {
      EX: USER_CACHE_TTL_IN_SECONDS,
    });
  }

  async setMany(users: User[]): Promise<void> {
    if (!users.length) {
      return;
    }

    const pipeline = redis.multi();

    for (const user of users) {
      pipeline.set(userCacheKey(user.id), JSON.stringify(user), {
        EX: USER_CACHE_TTL_IN_SECONDS,
      });
    }

    await pipeline.exec();
  }

  async delete(id: string): Promise<void> {
    await redis.del(userCacheKey(id));
  }

  async flush(): Promise<void> {
    await redis.flushAll();
  }
}
