import { pool } from '../database/postgres';

async function cleanUsers() {
  console.time('Clean');

  await pool.query(`
    TRUNCATE TABLE users CASCADE;
  `);

  console.timeEnd('Clean');

  await pool.end();
}

cleanUsers().catch(console.error);
