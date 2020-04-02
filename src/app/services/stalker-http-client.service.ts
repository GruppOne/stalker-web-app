import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {BaseStalkerHttpClient} from '../models/base-stalker-http-client';

@Injectable({
  providedIn: 'root',
})
export class StalkerHttpClientService extends BaseStalkerHttpClient {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
}
