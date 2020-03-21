// **********************************************************
// * THIS FILE SHOULD NEVER BE IMPORTED DIRECTLY BY THE APP *
// **********************************************************

import {Environment} from './environment.d';

// production configuration

// TODO define API URL
const apiHost = 'localhost:11111';
const apiUrl = `https://${apiHost}/api/v1`;

export const environment: Environment = {
  production: true,
  apiHost,
  apiUrl,
};
