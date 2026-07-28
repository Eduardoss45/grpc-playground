import path from 'path';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export function loadGrpc() {
  const protoPath = path.resolve(__dirname, 'proto/user.proto');
  const packageDefinition = protoLoader.loadSync(protoPath);
  const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

  return {
    userPackage: grpcObject.user,
  };
}
