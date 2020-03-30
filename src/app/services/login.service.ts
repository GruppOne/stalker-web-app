import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../models/user';

import {HttpStalkerService} from './http-stalker.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginURL = environment.apiUrl + '/user/login';

  constructor(private httpStalker: HttpStalkerService) {}

  login(user: User): Observable<HttpResponse<User>> {
    const handler: (
      err: any,
      caught: Observable<HttpResponse<User>>,
    ) => Observable<any> = this.handleError<any>([]);

    return this.httpStalker.userPost(this.loginURL, user).pipe(catchError(handler));
  }

  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
