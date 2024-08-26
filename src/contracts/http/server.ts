import { Router } from './router';

export type ServerConfig = {
  port: number;
  router: Router;
};

export abstract class Server {
  protected readonly _port: number;
  protected readonly _router: Router;

  public constructor({ port, router }: ServerConfig) {
    this._port = port;
    this._router = router;
  }

  public get port() {
    return this._port;
  }

  public get router() {
    return this._router;
  }

  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;
}
