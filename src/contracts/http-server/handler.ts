import { Request } from './request';
import { Response } from './response';

export type HttpHandler = (
  request: Request,
  response: Response
) => Promise<void>;
