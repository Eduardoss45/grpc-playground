import { User } from '../types/user';
import { UserRepository } from './user.repository';
import { postgres } from '../database/postgres';

export class PostgresUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const result = await postgres.query(
      `
      INSERT INTO users (id, name, email)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `,
      [user.id, user.name, user.email]
    );

    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const result = await postgres.query(
      `
      SELECT id, name, email
      FROM users
      WHERE id = $1
    `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async findAll(limit = 100, offset = 0): Promise<User[]> {
    const result = await postgres.query(
      `
      SELECT id, name, email
      FROM users
      ORDER BY id
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );

    return result.rows;
  }

  async delete(id: string): Promise<void> {
    await postgres.query(
      `
    DELETE FROM users
    WHERE id = $1
    `,
      [id]
    );
  }
}
