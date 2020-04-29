import {HttpResponse} from '@angular/common/http';
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
  private readonly adminMapping = new Map();
  constructor(private readonly httpClientService: HttpClientService) {
    this.adminMapping.set('Admin', 4);
    this.adminMapping.set('Owner', 3);
    this.adminMapping.set('Manager', 2);
    this.adminMapping.set('Viewer', 1);
  }

  login(user: User): Observable<User> {
    return this.httpClientService.post<User>('/user/login', user).pipe(
      map((response: HttpResponse<User>) => {
        console.log(response);
        // let jwtTokenHeader = response.headers.get('Authorization') as string;
        const jwtTokenHeader =
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25zIjpbeyJvcmdhbml6YXRpb25JZCI6' +
          'Miwicm9sZSI6Ik1hbmFnZXIifSx7Im9yZ2FuaXphdGlvbklkIjozLCJyb2xlIjoiVmlld2VyIn1' +
          'dLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNTg3OTEwNDI3LCJleHAiOjE1OTA5MTA0Mjd9.xOKpTUzPDM' +
          'mjIffL7uUNJ48VY5bUun2rZDD7nmK9zt4';
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

  checkAuthorization(actualOrgId: number, desiredRole: string): boolean {
    let authroized = false;
    const connectedOrg = JSON.parse(localStorage.getItem('organizations') as string);
    console.log(connectedOrg);
    connectedOrg.forEach((element: {organizationId: number; role: string}) => {
      if (
        element.organizationId === actualOrgId &&
        this.adminMapping.get(element.role) >= this.adminMapping.get(desiredRole)
      ) {
        authroized = true;
      }
    });
    return authroized;
  }
}
