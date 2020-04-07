/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// Included with Angular CLI.
import 'zone.js/dist/zone-error';
import {Environment} from './environment.d';

const apiHost = '127.0.0.1:3100';
const apiUrl = `http://${apiHost}`;

// default development configuration
export const environment: Environment = {
  production: false,
  apiHost,
  apiUrl,
};
