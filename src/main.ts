import 'dotenv/config';

import { startApp } from './app/bootstrap';

startApp().catch(err => {
  console.error('Erro ao iniciar aplicacao: ', err);
  process.exit(1);
});
