import { Pool } from 'pg';

export const postgres = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'grpc',
  password: 'grpc',
  database: 'grpc_playground',
});

export async function connectPostgres() {
  const client = await postgres.connect();

  client.release();

  console.log('PostgreSQL conectado com sucesso!');
}
