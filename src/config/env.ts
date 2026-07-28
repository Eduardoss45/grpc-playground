import 'dotenv/config';

const cacheActive = process.env.CACHE_ACTIVE;

if (!cacheActive) {
  throw new Error('CACHE_ACTIVE nao foi definida');
}

export const env = {
  grpcAddress: '0.0.0.0:50051',
  postgres: {
    host: 'localhost',
    port: 5432,
    user: 'grpc',
    password: 'grpc',
    database: 'grpc_playground',
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
  cacheEnabled: cacheActive === 'true',
};
