// Shared TypeScript-only types that mirror src/proto/user.proto.
// These are NOT generated types; they just keep the codebase consistent and typed.

export type User = {
  id: string;
  name: string;
  email: string;
};

export interface UserCache {
  get(id: string): Promise<User | null>;
  set(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export type CreateUserRequest = {
  name: string;
  email: string;
};

export type ListUserRequest = {
  limit: number;
  offset: number;
};

export type GetUserRequest = {
  id: string;
};
