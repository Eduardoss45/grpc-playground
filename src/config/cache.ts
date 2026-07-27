import 'dotenv/config';

const cacheActive = process.env.CACHE_ACTIVE;

if (!cacheActive) {
  throw new Error('CACHE_ACTIVE não foi definida');
}

export const cacheEnabled = process.env.CACHE_ACTIVE === 'true';
