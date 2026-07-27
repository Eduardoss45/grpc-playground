import * as grpc from '@grpc/grpc-js';

import type { CreateUserRequest, GetUserRequest, ListUserRequest, User } from '../types/user';
import { userService } from '../config/dependencies';
import { randomUUID } from 'node:crypto';
export async function createUser(
  call: grpc.ServerUnaryCall<CreateUserRequest, User>,
  callback: grpc.sendUnaryData<User>
) {
  if (!call.request.name || !call.request.email) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Name and email are required',
    });
  }

  const id = randomUUID();

  const user = {
    id,
    name: call.request.name,
    email: call.request.email,
  };

  await userService.createUser(user);

  callback(null, user);
}

export async function getUser(
  call: grpc.ServerUnaryCall<GetUserRequest, User>,
  callback: grpc.sendUnaryData<User>
) {
  if (!call.request.id) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'ID is required',
    });
  }

  const user = await userService.getUser(call.request.id);

  if (!user) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: 'User not found',
    });
  }

  callback(null, user);
}

export async function listUsers(call: grpc.ServerWritableStream<ListUserRequest, User>) {
  const limit = call.request.limit || 1000;
  let offset = call.request.offset || 0;

  while (true) {
    const users = await userService.findAllUsers(limit, offset);

    if (!users.length) {
      break;
    }

    for (const user of users) {
      if (call.cancelled) {
        return;
      }

      call.write(user);
    }

    offset += limit;
  }

  call.end();
}
