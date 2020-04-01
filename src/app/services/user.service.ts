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
export class UserService extends StalkerHttpClientDecorator {
  userUrl = '/user';
  handler: (
    err: HttpErrorResponse,
    caught: Observable<HttpResponse<User>>,
  ) => Observable<HttpResponse<User>> = this.handleError<HttpResponse<User>>();
  constructor(private httpStalkerService: StalkerHttpClientService) {
    super(httpStalkerService);
  }

  getUserById(id: number): Observable<HttpResponse<User>> {
    return this.httpStalkerService
      .get<User>(this.userUrl + '/' + id.toString())
      .pipe(catchError(this.handler));
  }

  handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
