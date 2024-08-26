import { Server, ServerConfig } from '@/contracts/http';
import Fastify, { FastifyInstance } from 'fastify';
import { handlerAdapter } from './handler-adapter';

export class FastifyHttpServer extends Server {
  private readonly app: FastifyInstance;

  constructor(config: ServerConfig) {
    super(config);
    this.app = Fastify();
  }

  start(): Promise<void> {
    this.registeRoutes();

    return new Promise((resolve, reject) => {
      this.app.listen({ port: this._port }, (error) => {
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

  private registeRoutes() {
    this._router.routes.forEach((route) => {
      const methodName = route.method.toLowerCase() as
        | 'get'
        | 'post'
        | 'patch'
        | 'put'
        | 'delete';

      if (!this.app[methodName]) {
        return;
      }

      this.app[methodName](
        route.uri,
        {
          preHandler: route.preHandlers.map((handler) => {
            return handlerAdapter(handler);
          })
        },
        handlerAdapter(route.handler)
      );
    });
  }
}
