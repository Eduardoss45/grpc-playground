import { check, sleep } from 'k6';
import { Client, Stream } from 'k6/net/grpc';

const client = new Client();

client.load(['../src/proto'], 'user.proto');

let connected = false;

export async function listUsersStreamPage() {
  if (!connected) {
    client.connect('localhost:50051', {
      plaintext: true,
    });

    connected = true;
  }

  const stream = new Stream(client, 'user.UserService/ListUsers');

  let received = 0;
  let failed = false;

  await new Promise((resolve, reject) => {
    stream.on('data', () => {
      received++;
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', err => {
      failed = true;
      resolve();
    });

    stream.write({
      limit: 100,
      offset: 0,
    });

    stream.end();
  });

  check(null, {
    'received 100 users': () => received === 100,

    'stream without error': () => !failed,
  });

  sleep(0.1);
}
