import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseStalkerHttpClient} from '../models/base-stalker-http-client';

@Injectable({
  providedIn: 'root',
})
export class StalkerHttpClientService extends BaseStalkerHttpClient {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  post<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return super.post<T>(path, body, headers);
  }
  put<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return super.put<T>(path, body, headers);
  }
  get<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return super.get<T>(path, headers);
  }
  delete<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return super.delete<T>(path, headers);
  }
}
