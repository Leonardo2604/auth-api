import { Handler } from './handler';
import { Method } from './method';
import { Route } from './route';

type RouteOptions = {
  preHandlers?: Handler[];
};

type GroupOptions = {
  prefix?: string;
  preHandlers?: Handler[];
};

export class Router {
  private readonly _routes: Route[];

  constructor() {
    this._routes = [];
  }

  public get routes() {
    return this._routes;
  }

  private route(
    method: Method,
    uri: string,
    handler: Handler,
    options?: RouteOptions
  ) {
    this._routes.push({
      method,
      uri,
      handler,
      preHandlers: options?.preHandlers ?? []
    });
  }

  get(uri: string, handler: Handler, options?: RouteOptions) {
    this.route('GET', uri, handler, options);
  }

  post(uri: string, handler: Handler, options?: RouteOptions) {
    this.route('POST', uri, handler, options);
  }

  put(uri: string, handler: Handler, options?: RouteOptions) {
    this.route('PUT', uri, handler, options);
  }

  patch(uri: string, handler: Handler, options?: RouteOptions) {
    this.route('PATCH', uri, handler, options);
  }

  delete(uri: string, handler: Handler, options?: RouteOptions) {
    this.route('DELETE', uri, handler, options);
  }

  group(cb: (router: Router) => void, options?: GroupOptions) {
    const router = new Router();

    cb(router);

    router.routes.forEach((route) => {
      let uri = route.uri;
      let preHandlers = route.preHandlers;

      if (options?.prefix) {
        const fixed = `${options.prefix}/${uri}`
          .split('/')
          .filter((path) => path !== '')
          .join('/');

        uri = '/' + fixed;
      }

      if (options?.preHandlers) {
        preHandlers = [...options.preHandlers, ...preHandlers];
      }

      this.route(route.method, uri, route.handler, {
        preHandlers
      });
    });
  }
}
