import { Server } from './contracts/http';

type Config = {
  httpServer: Server;
};

export class App {
  private readonly httpServer: Server;

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
