import { saveUser, getUserById, getAllUsers, generateId } from '../storage/user.store';
import * as grpc from '@grpc/grpc-js';

import type { CreateUserRequest, Empty, GetUserRequest, User } from '../types/user';

export function createUser(
  call: grpc.ServerUnaryCall<CreateUserRequest, User>,
  callback: grpc.sendUnaryData<User>
) {
  if (!call.request.name || !call.request.email) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Name and email are required',
    });
  }

  const id = generateId();

  const user = {
    id,
    name: call.request.name,
    email: call.request.email,
  };

  saveUser(user);

  callback(null, user);
}

export function getUser(
  call: grpc.ServerUnaryCall<GetUserRequest, User>,
  callback: grpc.sendUnaryData<User>
) {
  if (!call.request.id) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'ID is required',
    });
  }

  const user = getUserById(call.request.id);

  if (!user) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: 'User not found',
    });
  }

  callback(null, user);
}

export function listUsers(call: grpc.ServerWritableStream<Empty, User>) {
  const users = getAllUsers();

  if (!users.length) {
    return call.end();
  }

  for (const user of users) {
    call.write(user);
  }

  call.end();
}
