import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {StalkerHttpClientService} from '../services/stalker-http-client.service';

import {BaseStalkerHttpClient} from './base-stalker-http-client';

export abstract class StalkerHttpClientDecorator extends BaseStalkerHttpClient {
  constructor(public stalkerHttpClient: StalkerHttpClientService) {
    super(stalkerHttpClient.httpClient);
  }

  private apiURL = environment.apiUrl;
  post<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.stalkerHttpClient.post<T>(this.apiURL + path, body, headers);
  }
  /*   put<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.stalkerHttpClient.put<T>(this.apiURL + path, body, headers);
  }
  get<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.stalkerHttpClient.get<T>(path, headers);
  }
  delete<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.stalkerHttpClient.delete<T>(path, headers);
  }*/
}
