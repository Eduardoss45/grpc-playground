import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { TARGET } from './config';
import type { CreateUserRequest, Empty, GetUserRequest, User } from '../src/types/user';

const PROTO_PATH = path.resolve(__dirname, '../src/proto/user.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

type UserServiceClient = grpc.Client & {
  CreateUser(
    request: CreateUserRequest,
    callback: (error: grpc.ServiceError | null, response: User) => void
  ): grpc.ClientUnaryCall;
  GetUser(
    request: GetUserRequest,
    callback: (error: grpc.ServiceError | null, response: User) => void
  ): grpc.ClientUnaryCall;
  ListUsers(request: Empty): grpc.ClientReadableStream<User>;
};

export const client = new grpcObject.user.UserService(
  TARGET,
  grpc.credentials.createInsecure()
) as unknown as UserServiceClient;
