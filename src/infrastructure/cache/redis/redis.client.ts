import { createClient } from 'redis';

import { env } from '../../../config/env';

export const redis = createClient({
  url: env.redis.url,
});

redis.on('error', err => console.error('Redis Client Error', err));

export async function connectRedis(): Promise<void> {
  if (!redis.isOpen) {
    await redis.connect();
  }

  console.log('Redis conectado com sucesso!');
}

export async function closeRedis(): Promise<void> {
  if (redis.isOpen) {
    await redis.quit();
  }
}
