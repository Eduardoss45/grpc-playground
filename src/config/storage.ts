import { PostgresUserRepository } from '../repositories/postgres-user.repository';
import type { UserRepository } from '../repositories/user.repository';

function createUserRepository(): UserRepository {
  return new PostgresUserRepository();
}

export const userRepository = createUserRepository();
