import { Handler } from '@/contracts/http';

export class InfoController {
  execute: Handler = async (request, response) => {
    response.json({
      name: 'auth-api',
      version: '1.0.0'
    });
  };
}
