import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { pool } from '../database/postgres';

const TOTAL_USERS = 100_000;
const BATCH_SIZE = 1000;

const ids: string[] = [];

async function seed() {
  console.time('Seed');

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const values = [];
    const params = [];

    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_USERS; j++) {
      const index = i + j;
      const id = randomUUID();

      ids.push(id);

      params.push(id, `User ${index}`, `user${index}@gmail.com`);

      const p = j * 3;
      values.push(`($${p + 1}, $${p + 2}, $${p + 3})`);
    }

    await pool.query(
      `
      INSERT INTO users(id, name, email)
      VALUES ${values.join(',')}
      `,
      params
    );

    console.log(`${Math.min(i + BATCH_SIZE, TOTAL_USERS)} usuários`);
  }

  writeFileSync('./k6/seed-data/user-ids.json', JSON.stringify(ids));

  console.timeEnd('Seed');
  await pool.end();
}

seed().catch(console.error);
