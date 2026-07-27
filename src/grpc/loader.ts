import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../proto/user.proto');

export function loadGrpcPackage() {
  const definition = protoLoader.loadSync(PROTO_PATH);

  const grpcObject = grpc.loadPackageDefinition(definition) as any;

  return grpcObject.user;
}
