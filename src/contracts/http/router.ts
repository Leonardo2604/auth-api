import { Handler } from './handler';
import { Method } from './method';
import { Route } from './route';

type RouteOptions = {
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
}
