import { Route } from './route';

export interface HttpServer {
  getPort(): number;

  addRoute(route: Route): void;

  start(): Promise<void>;
  stop(): Promise<void>;
}
