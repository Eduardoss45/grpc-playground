import { Client } from 'k6/net/grpc';
import { check } from 'k6';
import grpc from 'k6/net/grpc';

const client = new Client();

let connected = false;

client.load(['../src/proto'], 'user.proto');

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 2000 },
    { duration: '1m', target: 5000 },
    { duration: '30s', target: 0 },
  ],
};

export default () => {
  if (!connected) {
    client.connect('localhost:50051', {
      plaintext: true,
    });

    connected = true;
  }

  const response = client.invoke('user.UserService/CreateUser', {
    name: 'Eduardo',
    email: `test-${__VU}-${__ITER}@gmail.com`,
  });

  check(response, {
    'CreateUser OK': r => r && r.status === grpc.StatusOK,
  });
};
