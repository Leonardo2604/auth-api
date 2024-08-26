import { Router } from '@/contracts/http';
import * as AppRouter from './app';

export const get = () => {
  const router = new Router();

  AppRouter.register(router);

  return router;
};
