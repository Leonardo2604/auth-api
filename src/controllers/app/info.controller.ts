import { HttpHandler } from '@/contracts/http-server/handler';

export class InfoController {
  execute: HttpHandler = async (request, response) => {
    response.json({
      name: 'auth-api',
      version: '1.0.0'
    });
  };
}
