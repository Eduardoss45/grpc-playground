import * as grpc from '@grpc/grpc-js';

import { createDependencies } from '../config/dependencies';
import { env } from '../config/env';
import { connectRedis } from '../infrastructure/cache/redis/redis.client';
import { connectPostgres } from '../infrastructure/database/postgres/postgres.client';
import { loadGrpc } from '../transport/grpc/loader';
import { createGrpcServer } from '../transport/grpc/server';
import { createUserHandlers } from '../transport/grpc/user.handlers';

export async function startApp(): Promise<void> {
  if (env.cacheEnabled) {
    await connectRedis();
  }

  await connectPostgres();

  const dependencies = createDependencies();
  const { userPackage } = loadGrpc();
  const handlers = createUserHandlers(dependencies.userService);

  const server = createGrpcServer(userPackage.UserService.service, handlers);

  server.bindAsync(env.grpcAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`gRPC rodando na porta ${port}`);
  });
}
