import { postgres } from '../database/postgres';
import { redis, connectRedis } from '../cache/redis';
import { cacheEnabled } from '../config/cache';

async function cleanUsers() {
  console.time('Clean');

  try {
    if (cacheEnabled) {
      await connectRedis();
    }

    await postgres.query(`
      TRUNCATE TABLE users CASCADE;
    `);

    console.log('Postgres limpo');

    if (cacheEnabled) {
      await redis.flushAll();
      console.log('Redis limpo');
    } else {
      console.log('Redis não está ativo');
    }
  } finally {
    await postgres.end();

    if (cacheEnabled && redis.isOpen) {
      await redis.quit();
    }
  }

  console.timeEnd('Clean');
}

cleanUsers().catch(console.error);
