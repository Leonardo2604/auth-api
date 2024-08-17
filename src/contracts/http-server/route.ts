import { HttpHandler } from './handler';
import { HttpMethod } from './method';

type Props = {
  method: HttpMethod;
  uri: string;
  handler: HttpHandler;
};

export class Route {
  private _method: HttpMethod;
  private _uri: string;
  private _handler: HttpHandler;

  private constructor({ method, uri, handler }: Props) {
    this._method = method;
    this._uri = uri;
    this._handler = handler;
  }

  static get(uri: string, handler: HttpHandler) {
    return new Route({
      method: HttpMethod.GET,
      uri,
      handler
    });
  }

  static post(uri: string, handler: HttpHandler) {
    return new Route({
      method: HttpMethod.POST,
      uri,
      handler
    });
  }

  static put(uri: string, handler: HttpHandler) {
    return new Route({
      method: HttpMethod.PUT,
      uri,
      handler
    });
  }

  static patch(uri: string, handler: HttpHandler) {
    return new Route({
      method: HttpMethod.PATCH,
      uri,
      handler
    });
  }

  static delete(uri: string, handler: HttpHandler) {
    return new Route({
      method: HttpMethod.DELETE,
      uri,
      handler
    });
  }

  public get method() {
    return this._method;
  }

  public get uri() {
    return this._uri;
  }

  public get handler() {
    return this._handler;
  }
}
