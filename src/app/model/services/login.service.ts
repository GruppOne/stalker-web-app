import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClientService: HttpClientService) {}

  login(user: User): Observable<HttpResponse<User>> {
    return this.httpClientService.post<User>('user/login', user);
  }

  // TODO this might be unneded
  loginWithAdditionalHeader(
    user: User,
    additionalHeaders: HttpHeaders,
  ): Observable<HttpResponse<User>> {
    return this.httpClientService.post<User>('user/login', user, additionalHeaders);
  }
}
