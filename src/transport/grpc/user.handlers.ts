import * as grpc from '@grpc/grpc-js';

import { UserService } from '../../application/services/user.service';
import { CreateUserRequest, GetUserRequest, ListUserRequest, User } from '../../domain/user/user';

export function createUserHandlers(userService: UserService): grpc.UntypedServiceImplementation {
  return {
    CreateUser: createUser(userService),
    GetUser: getUser(userService),
    ListUsers: listUsers(userService),
  };
}

function createUser(userService: UserService) {
  return async (
    call: grpc.ServerUnaryCall<CreateUserRequest, User>,
    callback: grpc.sendUnaryData<User>
  ): Promise<void> => {
    if (!call.request.name || !call.request.email) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Name and email are required',
      });
    }

    const user = await userService.createUser({
      name: call.request.name,
      email: call.request.email,
    });

    callback(null, user);
  };
}

function getUser(userService: UserService) {
  return async (
    call: grpc.ServerUnaryCall<GetUserRequest, User>,
    callback: grpc.sendUnaryData<User>
  ): Promise<void> => {
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
  };
}

function listUsers(userService: UserService) {
  return async (call: grpc.ServerWritableStream<ListUserRequest, User>): Promise<void> => {
    const limit = call.request.limit || 1000;
    let offset = call.request.offset || 0;

    while (true) {
      const users = await userService.listUsers(limit, offset);

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
  };
}
