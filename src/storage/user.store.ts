let currentId = 0;

const users = new Map<string, any>();

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

export function saveUser(user: any) {
  users.set(user.id, user);
}

export function getUserById(id: string) {
  return users.get(id) || null;
}

export function getAllUsers() {
  return Array.from(users.values());
}
