import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

export interface StalkerJWT {
  organizations: {organizationId: number; role: string}[];
  jti: string;
  sub: string;
  iat: number;
  exp: number;
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
          'MSwicm9sZSI6IlZpZXdlciJ9LHsib3JnYW5pemF0aW9uSWQiOjIsInJvbGUiOiJBZG1pbiJ9XSwi' +
          'anRpIjoiMiIsInN1YiI6Imdpb3JnaW90ZXN0MDJAaG90bWFpbC5pdCIsImlhdCI6MTU4ODMyODkz' +
          'MSwiZXhwIjoxNTkxMzI4OTMxfQ.E7IRmte9p6-Yrl2B6iQBvQ9qxzwoCkO1lXgmjvbhlKk';
        const jwtToken = jwtTokenHeader.substring(7);
        const payload: StalkerJWT = jwt.verify(
          jwtToken,
          'OurSecureSecretLongKeyForStalkerJWTtokens',
        ) as StalkerJWT;

        console.log(payload);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user_id', payload.jti);
        localStorage.setItem('user_email', payload.sub);
        localStorage.setItem('organizations', JSON.stringify(payload.organizations));
        localStorage.setItem('expiration_time', payload.exp.toString());
        localStorage.setItem('creation_time', payload.iat.toString());
        return response.body as User;
      }),
    );
  }
  /** check if the user id is the same as the one he's trying to reach */
  getUserId(): string {
    return localStorage.getItem('user_id') as string;
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
    localStorage.removeItem('user_id');
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
