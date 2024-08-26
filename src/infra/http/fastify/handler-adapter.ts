import { Handler } from '@/contracts/http';
import { RouteHandlerMethod } from 'fastify';
import { FastifyRequestAdapter } from './request-adapter';
import { FastifyRespondeAdapter } from './response-adapter';

export const handlerAdapter = (httpHandler: Handler): RouteHandlerMethod => {
  return async (request, response) => {
    await httpHandler(
      new FastifyRequestAdapter(request),
      new FastifyRespondeAdapter(response)
    );
  };
};
