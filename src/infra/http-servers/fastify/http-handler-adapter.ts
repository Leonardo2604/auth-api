import { HttpHandler } from '@/contracts/http-server/handler';
import { RouteHandlerMethod } from 'fastify';

export const fastifyHttpHandlerAdapter = (
  httpHandler: HttpHandler
): RouteHandlerMethod => {
  return async (request, response) => {
    await httpHandler(request, {
      json: response.send.bind(response)
    });
  };
};
