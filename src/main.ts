import 'dotenv/config';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { createGrpcServer } from './grpc/server';
import { createUser, getUser, listUsers } from './grpc/user.handlers';
import { connectRedis } from './cache/redis';

const PROTO_PATH = path.resolve(__dirname, './proto/user.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH);

const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const userPackage = grpcObject.user;

const server = createGrpcServer(userPackage.UserService.service, {
  CreateUser: createUser,
  GetUser: getUser,
  ListUsers: listUsers,
});

async function bootstrap() {
  await connectRedis();
}

bootstrap();

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erro ao iniciar gRPC:', err);
    process.exit(1);
  }

  console.log(`gRPC rodando na porta ${port}`);
});
