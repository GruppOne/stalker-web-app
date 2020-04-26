import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

export interface StalkerJWT {
  exp: number;
  iat: number;

  organizations: {organizationId: number; role: string}[];

  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClientService: HttpClientService) {}

  login(user: User): Observable<User> {
    return this.httpClientService.post<User>('/user/login', user).pipe(
      map((response: HttpResponse<User>) => {
        console.log(response);
        // let jwtTokenHeader = response.headers.get('Authorization') as string;
        const jwtTokenHeader =
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25zIjpbeyJvcmdhbml6YXRpb25JZCI6' +
          'Miwicm9sZSI6IlJPTEVfTUFOQUdFUiJ9LHsib3JnYW5pemF0aW9uSWQiOjMsInJvbGUiOiJST0x' +
          'FX1ZJRVdFUiJ9XSwic3ViIjoidXNlciIsImlhdCI6MTU4NzkxMDQyNywiZXhwIjoxNTkwOTEwND' +
          'I3fQ.cxdSfwuN8orpXLD_O9pRuVfdnzyvHkm2Efd5MWUVe6M';
        const jwtToken = jwtTokenHeader.substring(7);
        const payload: StalkerJWT = jwt.verify(
          jwtToken,
          'OurSecureSecretLongKeyForStalkerJWTtokens',
        ) as StalkerJWT;

        console.log(payload);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user_email', payload.sub);
        localStorage.setItem('organizations', JSON.stringify(payload.organizations));
        localStorage.setItem('expiration_time', payload.exp.toString());
        localStorage.setItem('creation_time', payload.iat.toString());
        return response.body as User;
      }),
    );
  }

  isLoggedIn(): boolean {
    if (
      !!localStorage.getItem('user_email') &&
      moment().isBefore(moment(localStorage.getItem('expiration_time') as string, 'X'))
    ) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('organizations');
    localStorage.removeItem('expiration_time');
    localStorage.removeItem('creation_time');
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
