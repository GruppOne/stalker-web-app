// TODO should we add structured logging?
// export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Environment {
  production: boolean;
  apiHost: string;
  apiUrl: string;

  // logLevel: LogLevel;
  // enableDebugTools: true;
}
