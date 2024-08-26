import { Input, Request } from './request';
import { Response } from './response';

// eslint-disable-next-line
export type Handler<In extends Input = any> = (
  request: Request<In>,
  response: Response
) => Promise<void>;
