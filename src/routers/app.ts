import { Route } from '@/contracts/http-server/route';
import { HttpServer } from '@/contracts/http-server/server';
import { InfoController } from '@/controllers/app/info.controller';

export const register = (server: HttpServer) => {
  const infoController = new InfoController();

  server.addRoute(Route.get('/', infoController.execute));
};
