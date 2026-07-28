import { UserService } from '../application/services/user.service';
import { RedisUserCache } from '../infrastructure/cache/redis/redis-user.cache';
import { PostgresUserRepository } from '../infrastructure/database/postgres/postgres-user.repository';
import { env } from './env';

export type AppDependencies = {
  userService: UserService;
};

export function createDependencies(): AppDependencies {
  const userRepository = new PostgresUserRepository();
  const userCache = new RedisUserCache();

  return {
    userService: new UserService(userRepository, userCache, {
      cacheEnabled: env.cacheEnabled,
    }),
  };
}
