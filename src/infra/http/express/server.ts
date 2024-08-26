import { Route, Server } from '@/contracts/http';
import express, { Express } from 'express';

import { Server as NodeServer } from 'node:http';
import { expressHttpHandlerAdapter } from './http-handler-adapter';

type Config = {
  port: number;
};

export class ExpressHttpServer implements Server {
  private server: NodeServer | null;
  private readonly app: Express;
  private readonly port: number;

  constructor({ port }: Config) {
    this.app = express();
    this.port = port;
    this.server = null;
  }

  addRoute(route: Route): void {
    switch (route.method) {
      case 'GET':
        this.app.get(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case 'POST':
        this.app.post(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case 'PUT':
        this.app.put(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case 'PATCH':
        this.app.patch(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case 'DELETE':
        this.app.delete(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
    }
  }

  getPort(): number {
    return this.port;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}
