import { HttpMethod } from '@/contracts/http-server/method';
import { Route } from '@/contracts/http-server/route';
import { HttpServer } from '@/contracts/http-server/server';
import express, { Express } from 'express';

import { Server } from 'http';
import { expressHttpHandlerAdapter } from './http-handler-adapter';

type Config = {
  port: number;
};

export class ExpressHttpServer implements HttpServer {
  private server: Server | null;
  private readonly app: Express;
  private readonly port: number;

  constructor({ port }: Config) {
    this.app = express();
    this.port = port;
    this.server = null;
  }

  addRoute(route: Route): void {
    switch (route.method) {
      case HttpMethod.GET:
        this.app.get(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.POST:
        this.app.post(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.PUT:
        this.app.put(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.PATCH:
        this.app.patch(route.uri, expressHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.DELETE:
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
