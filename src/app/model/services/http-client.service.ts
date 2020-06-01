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
      .pipe(catchError(this.handleError()));
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
      .pipe(catchError(this.handleError()));
  }

  put<T>(
    relativePath: string,
    body: T,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .put<T>(`${this.url}${relativePath}`, body, httpOptions)
      .pipe(catchError(this.handleError()));
  }

  delete<T>(
    relativePath: string,
    additionalHeaders?: HttpHeaders,
  ): Observable<HttpResponse<T>> {
    const httpOptions = this.mergeAdditionalHeaders(additionalHeaders);

    return this.httpClient
      .delete<T>(`${this.url}${relativePath}`, httpOptions)
      .pipe(catchError(this.handleError()));
  }
  private mergeAdditionalHeaders(additionalHeaders?: HttpHeaders): HttpOptions {
    let httpHeaders = this.defaultHttpHeaders;

    if (additionalHeaders) {
      additionalHeaders.keys().forEach((key) => {
        const value = additionalHeaders.getAll(key);
        httpHeaders = httpHeaders.append(key, value as string[]);
      });
    }

    return {
      headers: httpHeaders,
      observe: 'response' as 'response',
    };
  }

  private handleError() {
    return (err: HttpErrorResponse) => {
      // more info about the error
      console.error(`status: ${err.status}, ${err.statusText}`);
      if (err.status.toString() === '0') {
        return throwError(
          'there seems to have been problems connecting to our' +
            ' servers, please try again later!',
        );
      } else if (
        err.status.toString() === '500' ||
        err.status.toString() === '501' ||
        err.status.toString() === '502' ||
        err.status.toString() === '503'
      ) {
        return throwError(
          'our server has experienced some internal errors' + ', please try again!',
        );
      } else if (err.status.toString() === '401') {
        return throwError(
          'You are not logged in yet' + ', please login and then try again!',
        );
      } else if (err.status.toString() === '403') {
        return throwError(
          'Sorry, but you are not a big enough member ' +
            'of stalker to complete this operation',
        );
      } else if (err.status.toString() === '404') {
        return throwError('Sorry, we could not find the resource you were looking for ');
      } else {
        return throwError(
          'Oops! seems there was an unexpected problem processing' +
            ' your request, please try again!',
        );
      }
    };
  }
}
