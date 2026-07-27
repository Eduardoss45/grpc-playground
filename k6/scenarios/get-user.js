import { Client } from 'k6/net/grpc';
import grpc from 'k6/net/grpc';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const client = new Client();

client.load(['../src/proto'], 'user.proto');

const ids = new SharedArray('user ids', () => {
  return JSON.parse(open('../seed-data/user-ids.json'));
});

let connected = false;

export function getUser() {
  if (!connected) {
    client.connect('localhost:50051', {
      plaintext: true,
    });

    connected = true;
  }

  const id = ids[Math.floor(Math.random() * ids.length)];

  const response = client.invoke('user.UserService/GetUser', {
    id,
  });

  check(response, {
    'GetUser OK': r => r && r.status === grpc.StatusOK,
  });
}
