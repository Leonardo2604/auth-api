import { App } from './app';
import { HTTP_SERVER_PORT } from './config/env';
import { ExpressHttpServer } from './infra/http-servers/express/http-server';
import * as Router from './routers';

const expressHttpServer = new ExpressHttpServer({
  port: HTTP_SERVER_PORT
});

Router.register(expressHttpServer);

const app = new App({
  httpServer: expressHttpServer
});

(async () => {
  await app.start();

  process.on('SIGTERM', async () => {
    await app.stop();
  });
})();
