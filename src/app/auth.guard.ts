import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';

import {LoginService} from './model/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly location: Location,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.isLoggedIn()) {
      const actualOrgId = +(route.paramMap.get('id') as string);
      return this.loginService.checkAuthorization(
        actualOrgId,
        route.data.roles,
        this.location,
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
