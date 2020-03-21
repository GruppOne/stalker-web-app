// **********************************************************
// * THIS FILE SHOULD NEVER BE IMPORTED DIRECTLY BY THE APP *
// **********************************************************

import {Environment} from './environment.d';

// development configuration with live remote server

// TODO what's the API URL for our vms? Imola Informatica server vms?
const apiHost = 'localhost:11111';
const apiUrl = `https://${apiHost}/api/v1`;

export const environment: Environment = {
  production: false,
  apiHost,
  apiUrl,
};
