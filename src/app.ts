import { HttpServer } from './contracts/http-server/server';

type Config = {
  httpServer: HttpServer;
};

export class App {
  private readonly httpServer: HttpServer;

  constructor({ httpServer }: Config) {
    this.httpServer = httpServer;
  }

  async start() {
    try {
      await this.httpServer.start();
      console.log(`app is running on ${this.httpServer.getPort()}`);
    } catch (error) {
      console.log(error);
    }
  }

  async stop() {
    await this.httpServer.stop();
  }
}
