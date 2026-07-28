import { writeFileSync } from 'node:fs';

import { createDependencies } from '../config/dependencies';
import { closePostgres } from '../infrastructure/database/postgres/postgres.client';

const TOTAL_USERS = 100_000;
const BATCH_SIZE = 1000;

async function seed(): Promise<void> {
  console.time('Seed');

  const { userService } = createDependencies();
  const ids = await userService.seedUsers(TOTAL_USERS, BATCH_SIZE, total => {
    console.log(`${total} usuarios`);
  });

  writeFileSync('./k6/seed-data/user-ids.json', JSON.stringify(ids));

  console.timeEnd('Seed');
  await closePostgres();
}

seed().catch(console.error);
