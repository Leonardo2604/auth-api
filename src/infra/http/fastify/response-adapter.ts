import { Response } from '@/contracts/http';
import { FastifyReply } from 'fastify';

export class FastifyRespondeAdapter implements Response {
  constructor(private readonly reply: FastifyReply) {}

  json(data: unknown): void {
    this.reply.send(data);
  }
}
