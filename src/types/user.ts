// Shared TypeScript-only types that mirror src/proto/user.proto.
// These are NOT generated types; they just keep the codebase consistent and typed.

export type User = {
  id: string;
  name: string;
  email: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
};

export type GetUserRequest = {
  id: string;
};

// proto message Empty {}
export type Empty = Record<string, never>;

