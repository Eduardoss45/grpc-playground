import { createDependencies } from '../config/dependencies';
import { env } from '../config/env';
import { closeRedis, connectRedis } from '../infrastructure/cache/redis/redis.client';
import { closePostgres } from '../infrastructure/database/postgres/postgres.client';

const BATCH_SIZE = 1000;

async function warmCache(): Promise<void> {
  if (!env.cacheEnabled) {
    console.log('Cache desativado.');
    return;
  }

  console.time('Warm Cache');

  await connectRedis();

  const { userService } = createDependencies();

  await userService.warmCache(BATCH_SIZE, total => {
    console.log(`${total} usuarios enviados ao Redis`);
  });

  console.timeEnd('Warm Cache');

  await closePostgres();
  await closeRedis();
}

warmCache().catch(console.error);
