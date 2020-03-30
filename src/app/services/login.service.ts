import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {HttpStalkerService} from './http-stalker.service';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL = environment.apiUrl + '/user/login';
  constructor(private httpStalker: HttpStalkerService) {}
  login(user: User): any {
    return this.httpStalker
      .userPost(this.loginURL, user)
      .pipe(catchError(this.handleError<any>([])));
  }
  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
