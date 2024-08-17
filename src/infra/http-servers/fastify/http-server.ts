import { HttpMethod } from '@/contracts/http-server/method';
import { Route } from '@/contracts/http-server/route';
import { HttpServer } from '@/contracts/http-server/server';
import Fastify, { FastifyInstance } from 'fastify';
import { fastifyHttpHandlerAdapter } from './http-handler-adapter';

type Config = {
  port: number;
};

export class FastifyHttpServer implements HttpServer {
  private readonly app: FastifyInstance;
  private readonly port: number;

  constructor({ port }: Config) {
    this.app = Fastify();
    this.port = port;
  }

  getPort(): number {
    return this.port;
  }

  addRoute(route: Route): void {
    switch (route.method) {
      case HttpMethod.GET:
        this.app.get(route.uri, fastifyHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.POST:
        this.app.post(route.uri, fastifyHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.PUT:
        this.app.put(route.uri, fastifyHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.PATCH:
        this.app.patch(route.uri, fastifyHttpHandlerAdapter(route.handler));
        break;
      case HttpMethod.DELETE:
        this.app.delete(route.uri, fastifyHttpHandlerAdapter(route.handler));
        break;
    }
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app.listen({ port: this.port }, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      this.app.close(() => {
        resolve();
      });
    });
  }
}
