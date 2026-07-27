import { getUser } from './scenarios/get-user.js';
import { createUser } from './scenarios/create-user.js';
import { listUsersStreamPage } from './scenarios/list-users-stream-page.js';

export const options = {
  scenarios: {
    get_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        {
          duration: '30s',
          target: 700,
        },
        {
          duration: '5m',
          target: 700,
        },
      ],
      exec: 'getUser',
    },

    create_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        {
          duration: '30s',
          target: 200,
        },
        {
          duration: '5m',
          target: 200,
        },
      ],
      exec: 'createUser',
    },

    list_users_page: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        {
          duration: '30s',
          target: 100,
        },
        {
          duration: '5m',
          target: 100,
        },
      ],
      exec: 'listUsersStreamPage',
    },
  },
};

export { getUser, createUser, listUsersStreamPage };
