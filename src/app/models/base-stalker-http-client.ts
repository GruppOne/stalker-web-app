import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class BaseStalkerHttpClient {
  private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private httpOptions = {
    headers: this.defaultHeaders,
    observe: 'response' as 'response',
  };

  constructor(public httpClient: HttpClient) {}

  // FIXME this resets the headers, losing the previous ones!
  post<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    if (headers) {
      this.httpOptions.headers = headers;
    }
    return this.httpClient.post<T>(path, body, this.httpOptions);
  }
  put<T>(path: string, body: T, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    if (headers) {
      this.httpOptions.headers = headers;
    }
    return this.httpClient.put<T>(path, body, this.httpOptions);
  }
  get<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    if (headers) {
      this.httpOptions.headers = headers;
    }
    return this.httpClient.get<T>(path, this.httpOptions);
  }
  delete<T>(path: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    if (headers) {
      this.httpOptions.headers = headers;
    }
    return this.httpClient.delete<T>(path, this.httpOptions);
  }
}
