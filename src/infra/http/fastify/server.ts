import { Router, Server } from '@/contracts/http';
import Fastify, { FastifyInstance } from 'fastify';
import { handlerAdapter } from './handler-adapter';

type Config = {
  port: number;
  router: Router;
};

export class FastifyHttpServer implements Server {
  private readonly app: FastifyInstance;
  private readonly router: Router;
  private readonly port: number;

  constructor({ port, router }: Config) {
    this.app = Fastify();
    this.port = port;
    this.router = router;
  }

  getPort(): number {
    return this.port;
  }

  start(): Promise<void> {
    this.registeRoutes();

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

  private registeRoutes() {
    this.router.routes.forEach((route) => {
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
