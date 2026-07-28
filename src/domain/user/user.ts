export type User = {
  id: string;
  name: string;
  email: string;
};

export type CreateUserInput = {
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

export type ListUserRequest = {
  limit: number;
  offset: number;
};
