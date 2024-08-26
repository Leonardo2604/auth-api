import { Router } from '@/contracts/http';
import { InfoController } from '@/controllers/app/info.controller';

export const register = (router: Router) => {
  const infoController = new InfoController();

  router.get('info', infoController.execute);
};
