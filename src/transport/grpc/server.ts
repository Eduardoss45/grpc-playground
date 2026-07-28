import * as grpc from '@grpc/grpc-js';

export function createGrpcServer(
  serviceDefinition: grpc.ServiceDefinition,
  handlers: grpc.UntypedServiceImplementation
): grpc.Server {
  const server = new grpc.Server();

  server.addService(serviceDefinition, handlers);

  return server;
}
