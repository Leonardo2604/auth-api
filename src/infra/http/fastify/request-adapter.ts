import { Request } from '@/contracts/http';
import { FastifyRequest } from 'fastify';

export class FastifyRequestAdapter implements Request {
  constructor(private readonly request: FastifyRequest) {}

  query(): unknown {
    return this.request.query;
  }

  body(): unknown {
    return this.request.body;
  }

  headers(): unknown {
    return this.request.headers;
  }

  params(): unknown {
    return this.request.params;
  }
}
