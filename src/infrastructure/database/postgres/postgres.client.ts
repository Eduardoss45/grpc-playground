import { Pool } from 'pg';

import { env } from '../../../config/env';

export const postgres = new Pool(env.postgres);

export async function connectPostgres(): Promise<void> {
  const client = await postgres.connect();

  client.release();

  console.log('PostgreSQL conectado com sucesso!');
}

export async function closePostgres(): Promise<void> {
  await postgres.end();
}
