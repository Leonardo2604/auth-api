export interface Server {
  getPort(): number;
  start(): Promise<void>;
  stop(): Promise<void>;
}
