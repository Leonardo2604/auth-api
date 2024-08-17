import { HttpServer } from '@/contracts/http-server/server';
import * as AppRouter from './app';

export const register = (server: HttpServer) => {
  AppRouter.register(server);
};
