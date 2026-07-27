import 'dotenv/config';

import { startApp } from './app';

startApp().catch(err => {
  console.error('Erro ao iniciar aplicação: ', err);
  process.exit(1);
});
