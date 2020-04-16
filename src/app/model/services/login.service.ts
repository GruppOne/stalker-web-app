import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../classes/users/user';

import {StalkerEndpoint} from './stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly stalkerEndpoint: StalkerEndpoint;

  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/user/login');
  }

  login(user: User): Observable<HttpResponse<User>> {
    return this.stalkerEndpoint.post<User>(user);
  }

  // TODO this might be unneded
  loginWithAdditionalHeader(
    user: User,
    additionalHeaders: HttpHeaders,
  ): Observable<HttpResponse<User>> {
    return this.stalkerEndpoint.post<User>(user, additionalHeaders);
  }
}
