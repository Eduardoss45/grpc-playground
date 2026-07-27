import { check, sleep } from 'k6';
import { Client, Stream } from 'k6/net/grpc';

const client = new Client();

client.load(['../src/proto'], 'user.proto');

export const options = {
  vus: 10,
  duration: '30s',
};

export default async () => {
  client.connect('localhost:50051', {
    plaintext: true,
  });

  const stream = new Stream(client, 'user.UserService/ListUsers');

  let received = 0;
  let failed = false;

  await new Promise((resolve, reject) => {
    stream.on('data', user => {
      received++;
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', err => {
      failed = true;
      console.log(err.message);
      reject(err);
    });

    stream.write({});

    stream.end();
  });

  check(null, {
    'received users': () => received > 0,
    'stream without error': () => !failed,
  });

  client.close();

  sleep(0.1);
};
