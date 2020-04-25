import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClientService: HttpClientService) {}

  login(user: User): Observable<User> {
    return this.httpClientService
      .post<User>('/user/login', user)
      .pipe(map((response: HttpResponse<User>) => response.body as User));
  }

  // TODO this might be unneded
  loginWithAdditionalHeader(
    user: User,
    additionalHeaders: HttpHeaders,
  ): Observable<User> {
    return this.httpClientService
      .post<User>('/user/login', user, additionalHeaders)
      .pipe(map((response: HttpResponse<User>) => response.body as User));
  }
}
