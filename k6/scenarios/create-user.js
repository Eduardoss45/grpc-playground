import { Client } from 'k6/net/grpc';
import { check } from 'k6';
import grpc from 'k6/net/grpc';

const client = new Client();

client.load(['../src/proto'], 'user.proto');

let connected = false;

export function createUser() {
  if (!connected) {
    client.connect('localhost:50051', {
      plaintext: true,
    });

    connected = true;
  }

  const response = client.invoke('user.UserService/CreateUser', {
    name: 'Test',
    email: `test-${Date.now()}-${__VU}-${__ITER}@gmail.com`,
  });

  check(response, {
    'CreateUser OK': r => r.status === grpc.StatusOK,
  });
}
