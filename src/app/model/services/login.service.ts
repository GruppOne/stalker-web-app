import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {LoginData} from '../classes/users/login-data';

import {HttpClientService} from './http-client.service';

export interface StalkerJWT {
  organizations: {organizationId: number; role: string}[];
  jti: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface JWT {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly adminMapping = new Map();
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly router: Router,
  ) {
    this.adminMapping.set('Admin', 4);
    this.adminMapping.set('Owner', 3);
    this.adminMapping.set('Manager', 2);
    this.adminMapping.set('Viewer', 1);
  }

  login(user: LoginData): Observable<boolean> {
    return this.httpClientService.post<LoginData>('/user/login', user).pipe(
      map((response: HttpResponse<unknown>) => {
        const jwtToken = response.body as JWT;
        const payload: StalkerJWT = jwt.decode(jwtToken.jwt) as StalkerJWT;
        localStorage.setItem('token', jwtToken.jwt);
        localStorage.setItem('user_id', payload.sub);
        localStorage.setItem('organizations', JSON.stringify(payload.organizations));
        localStorage.setItem('expiration_time', payload.exp.toString());
        localStorage.setItem('creation_time', payload.iat.toString());
        return true;
      }),
    );
  }
  /** check if the user id is the same as the one he's trying to reach */
  getUserId(): string {
    return localStorage.getItem('user_id') as string;
  }

  isLoggedIn(): boolean {
    if (
      !!localStorage.getItem('user_id') &&
      moment().isBefore(moment(localStorage.getItem('expiration_time') as string, 'X'))
    ) {
      return true;
    }
    return false;
  }

  getAdminOrganizations(): Observable<{organizationId: number; role: string}[]> {
    return this.httpClientService
      .get<{rolesInOrganizations: {organizationId: number; role: string}[]}>(
        `/user/${localStorage.getItem('user_id')}/organizations/roles`,
      )
      .pipe(
        map(
          (
            response: HttpResponse<{
              rolesInOrganizations: {organizationId: number; role: string}[];
            }>,
          ) =>
            response.body?.rolesInOrganizations as {
              organizationId: number;
              role: string;
            }[],
        ),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('organizations');
    localStorage.removeItem('expiration_time');
    localStorage.removeItem('creation_time');
    this.router.navigate(['/home']);
  }

  checkAuthorization(actualOrgId: number, desiredRole: string): boolean {
    let authorized = false;
    this.getAdminOrganizations().subscribe(
      (response: {organizationId: number; role: string}[]) => {
        response.forEach((element: {organizationId: number; role: string}) => {
          if (
            element.organizationId === actualOrgId &&
            this.adminMapping.get(element.role) >= this.adminMapping.get(desiredRole)
          ) {
            authorized = true;
          }
        });
      },
    );
    return authorized;
  }
}
