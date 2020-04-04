import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

interface HttpOptions {
  headers: HttpHeaders;
  observe: 'response';
}

export class StalkerEndpoint {
  private url = environment.apiUrl;
  private defaultHttpHeaders: HttpHeaders;

  constructor(private readonly httpClient: HttpClient, relativePath: string) {
    this.setPath(relativePath);

    this.defaultHttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  setPath(relativePath: string): void {
    const apiUrl = environment.apiUrl;
    const trimmedRelativePath = relativePath.replace(/^\/|\/$/, '');
    this.url = apiUrl + '/' + trimmedRelativePath;
  }

  // TODO implement all verbs
  get<T>(additionalHeaders?: HttpHeaders): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);
    const errorHandler = this.handleError<HttpResponse<T>>();

    return this.httpClient.get<T>(this.url, httpOptions).pipe(catchError(errorHandler));
  }

  // TODO refactor to reduce duplication
  post<T>(body: T, additionalHeaders?: HttpHeaders): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);
    const errorHandler = this.handleError<HttpResponse<T>>();

    return this.httpClient
      .post<T>(this.url, body, httpOptions)
      .pipe(catchError(errorHandler));
  }

  // put<T>(body: T, additionalHeaders?: HttpHeaders): Observable<HttpResponse<T>> {
  //   const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);
  //   const errorHandler = this.handleError<HttpResponse<T>>();

  //   return this.httpClient
  //     .put<T>(this.url, body, httpOptions)
  //     .pipe(catchError(errorHandler));
  // }

  // delete<T>(additionalHeaders?: HttpHeaders): Observable<HttpResponse<T>> {
  //   const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);
  //   const errorHandler = this.handleError<HttpResponse<T>>();

  //   return this.httpClient
  //     .delete<T>(this.url, httpOptions)
  //     .pipe(catchError(errorHandler));
  // }

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
  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
