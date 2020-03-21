/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
import {Environment} from './environment.d';

const apiHost = 'localhost:11111';
const apiUrl = `http://${apiHost}/api/v1`;

// default development configuration
export const environment: Environment = {
  production: false,
  apiHost,
  apiUrl,
};
