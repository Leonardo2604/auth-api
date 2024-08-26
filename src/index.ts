import { App } from './app';
import { HTTP_SERVER_PORT } from './config/env';
import { FastifyHttpServer } from './infra/http/fastify/server';
import * as Router from './routers';

const httpServer = new FastifyHttpServer({
  port: HTTP_SERVER_PORT,
  router: Router.get()
});

const app = new App({
  httpServer
});

(async () => {
  await app.start();

  process.on('SIGTERM', async () => {
    await app.stop();
  });
})();
