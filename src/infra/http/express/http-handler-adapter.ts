import { Handler } from '@/contracts/http';
import { RequestHandler } from 'express';

export const expressHttpHandlerAdapter = (
  httpHandler: Handler
): RequestHandler => {
  return async (request, response) => {
    await httpHandler(request, response);
  };
};
