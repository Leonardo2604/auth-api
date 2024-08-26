import { Handler, Method } from '.';

export type Route = {
  method: Method;
  uri: string;
  preHandlers: Handler[];
  handler: Handler;
};
