import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

interface HttpOptions {
  headers: HttpHeaders;
  observe: 'response';
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private readonly url = environment.apiUrl;
  private readonly defaultHttpHeaders: HttpHeaders;
  constructor(private readonly httpClient: HttpClient) {
    this.defaultHttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  get<T>(
    relativePath: string,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .get<T>(`${this.url}${relativePath}`, httpOptions)
      .pipe(catchError(this.handleError('getData')));
  }

  // TODO refactor to reduce duplication
  post<T>(
    relativePath: string,
    body: T,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .post<T>(`${this.url}${relativePath}`, body, httpOptions)
      .pipe(catchError(this.handleError('postData')));
  }

  put<T>(
    relativePath: string,
    body: T,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .put<T>(`${this.url}${relativePath}`, body, httpOptions)
      .pipe(catchError(this.handleError('putData')));
  }

  delete<T>(
    relativePath: string,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .delete<T>(`${this.url}${relativePath}`, httpOptions)
      .pipe(catchError(this.handleError('deleteData')));
  }
  private mergeAdditionalHeaders(additionalHeaders?: HttpHeaders): HttpOptions {
    let httpHeaders = this.defaultHttpHeaders;

    if (additionalHeaders) {
      additionalHeaders.keys().forEach((key) => {
        const value = additionalHeaders.getAll(key);

        if (value) {
          httpHeaders = httpHeaders.append(key, value);
        }
      });
    }

    return {
      headers: httpHeaders,
      observe: 'response' as 'response',
    };
  }

  // TODO declare explicitly this type?
  /*  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      Observable.throw('');
    };
  } */
  private handleError(operation: string) {
    return (err: HttpErrorResponse) => {
      const errMsg = `error in ${operation}() retrieving ${this.url}`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
      }
      return throwError(err.message);
    };
  }
}
