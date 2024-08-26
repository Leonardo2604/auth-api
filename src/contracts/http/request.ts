export type DefautQuery = unknown;
export type DefautBody = unknown;
export type DefautHeaders = unknown;
export type DefautParams = unknown;

export type Input = {
  query?: DefautQuery;
  body?: DefautBody;
  headers?: DefautHeaders;
  params?: DefautParams;
};

export interface Request<I extends Input = Input> {
  query(): I['query'];
  body(): I['body'];
  headers(): I['headers'];
  params(): I['params'];
}
