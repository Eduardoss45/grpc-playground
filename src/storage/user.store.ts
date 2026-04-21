let currentId = 0;

import type { User } from '../types/user';

const users = new Map<string, User>();

users.set('1', { id: '1', name: 'Eduardo', email: 'edu@email.com' });
users.set('2', { id: '2', name: 'Ana', email: 'ana@email.com' });
users.set('3', { id: '3', name: 'Rodrigo', email: 'rodrigo@email.com' });

const numericIds = Array.from(users.keys())
  .map(id => Number(id))
  .filter(id => !Number.isNaN(id));

currentId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

export function generateId(): string {
  currentId++;
  return String(currentId);
}

export function saveUser(user: User): void {
  users.set(user.id, user);
}

export function getUserById(id: string): User | null {
  return users.get(id) || null;
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}
