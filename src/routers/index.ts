import { Router } from '@/contracts/http';
import * as AppRouter from './app';

export const get = () => {
  const router = new Router();

  router.group(
    (v1) => {
      AppRouter.register(v1);
    },
    {
      prefix: 'v1'
    }
  );

  return router;
};
