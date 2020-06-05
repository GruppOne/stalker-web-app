import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminType} from './model/classes/administrator';
import {LoginService} from './model/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly location: Location,
    private readonly router: Router,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    if (this.loginService.isLoggedIn()) {
      if (route.url.toString().includes('organization')) {
        // return true;
        // ---------------- REPLACE THIS WITH THE LINE ABOVE TO TEST ORGANIZATION/ PATHS
        const actualOrgId = +(route.paramMap.get('id') as string);
        if (actualOrgId) {
          return this.loginService.checkAuthorization(actualOrgId, route.data.roles).pipe(
            map((response) => {
              if (response) {
                return true;
              } else {
                this.location.back();
                return false;
              }
            }),
          );
        } else {
          return true;
        }
        // ----------------------------------------------------------------
      } else {
        if (route.url.toString().includes('user/')) {
          if ((route.paramMap.get('id') as string) === this.loginService.getUserId()) {
            return true;
          } else {
            return false;
          }
        } else if (route.url.toString().includes('users')) {
          return this.loginService.checkAuthorization(0, AdminType.admin).pipe(
            map((response) => {
              if (response) {
                return true;
              } else {
                this.location.back();
                return false;
              }
            }),
          );
        } else {
          return true;
        }
      }
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
