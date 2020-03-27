import {Injectable} from '@angular/core';
import {User} from './user';
import {environment} from './../environments/environment';
import {HttpStalker} from './http-stalker';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // loginURL = environment.apiUrl + 'user/login';
  loginURL = environment.apiUrl + '/user/login';
  constructor(private httpStalker: HttpStalker) {}
  login(user: User): any {
    return this.httpStalker
      .fakepost(this.loginURL, user)
      .pipe(catchError(this.handleError<any>([])));
  }
  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
