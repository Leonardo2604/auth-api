import { HttpHandler } from '@/contracts/http-server/handler';
import { RequestHandler } from 'express';

export const expressHttpHandlerAdapter = (
  httpHandler: HttpHandler
): RequestHandler => {
  return async (request, response) => {
    await httpHandler(request, response);
  };
};
