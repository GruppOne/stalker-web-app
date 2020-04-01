import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {StalkerHttpClientDecorator} from '../models/stalker-http-client-decorator';
import {User} from '../models/users/user';

import {StalkerHttpClientService} from './stalker-http-client.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService extends StalkerHttpClientDecorator {
  private loginURL = '/user/login';

  constructor(public httpStalker: StalkerHttpClientService) {
    super(httpStalker);
  }

  login(user: User): Observable<HttpResponse<User>> {
    const handler: (
      err: HttpErrorResponse,
      caught: Observable<HttpResponse<User>>,
    ) => Observable<HttpResponse<User>> = this.handleError<HttpResponse<User>>();
    return super.post<User>(this.loginURL, user).pipe(catchError(handler));
  }

  handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
