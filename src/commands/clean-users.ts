import { createDependencies } from '../config/dependencies';
import { env } from '../config/env';
import { closeRedis, connectRedis } from '../infrastructure/cache/redis/redis.client';
import { closePostgres } from '../infrastructure/database/postgres/postgres.client';

async function cleanUsers(): Promise<void> {
  console.time('Clean');

  try {
    if (env.cacheEnabled) {
      await connectRedis();
    }

    const { userService } = createDependencies();
    const result = await userService.cleanUsers();

    if (result.postgresCleaned) {
      console.log('Postgres limpo');
    }

    if (result.redisCleaned) {
      console.log('Redis limpo');
    } else {
      console.log('Redis nao esta ativo');
    }
  } finally {
    await closePostgres();
    await closeRedis();
  }

  console.timeEnd('Clean');
}

cleanUsers().catch(console.error);
