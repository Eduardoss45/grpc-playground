import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export function loadGrpc() {
  const PROTO_PATH = path.resolve(__dirname, '../proto/user.proto');

  const packageDef = protoLoader.loadSync(PROTO_PATH);

  const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

  return {
    userPackage: grpcObject.user,
  };
}
