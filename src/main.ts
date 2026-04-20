import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { createGrpcServer } from './grpc/server';
import { createUser, getUser, listUsers } from './grpc/user.handlers';

const PROTO_PATH = path.resolve(__dirname, './proto/user.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const userPackage = grpcObject.user;

const server = createGrpcServer(userPackage.UserService.service, {
  CreateUser: createUser,
  GetUser: getUser,
  ListUsers: listUsers,
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Falha ao iniciar o servidor gRPC: ', err);
    return;
  }

  console.log(`gRPC rodando na porta ${port}`);
});
