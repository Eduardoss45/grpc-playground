import * as grpc from '@grpc/grpc-js';
import { performance } from 'perf_hooks';
import { client } from './client';
import { addLatency } from './metrics';
import type { User } from '../src/types/user';

export function createUser(): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    const start = performance.now();

    client.CreateUser(
      { name: 'User', email: 'test@test.com' },
      (err: grpc.ServiceError | null, res: User) => {
        const end = performance.now();
        addLatency(end - start);

        if (err) return reject(err);
        resolve(res);
      }
    );
  });
}

export async function runBatch(size: number) {
  const tasks = [];

  for (let i = 0; i < size; i++) {
    tasks.push(createUser());
  }

  await Promise.all(tasks);
}
