import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router, UrlSegment, ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthGuard} from './auth.guard';
import {AdminType} from './model/classes/administrator';
import {LoginService} from './model/services/login.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const loginService = jasmine.createSpyObj('LoginService', [
    'isLoggedIn',
    'checkAuthorization',
  ]);
  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);
  const mockParamMap = jasmine.createSpyObj('ParamMap', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: LoginService, useValue: loginService},
        {provide: UrlSegment, useValue: urlSegment},
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return false for canActivate() when isLoggedIn === false', () => {
    loginService.isLoggedIn.and.returnValue(false);
    loginService.checkAuthorization.and.returnValue(false);
    const result = guard.canActivate({
      url: [
        {
          path: 'organization',
        } as UrlSegment,
      ],
    } as ActivatedRouteSnapshot);
    expect(result).toBe(false);
    expect(loginService.redirectUrl).toBeUndefined();
  });
  it(
    'should return false for canActivate() when isLoggedIn === true and' +
      'checkAuthorization === false and id returns params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(false);
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue('1');
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toBe(false);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return true for canActivate() when isLoggedIn === true and' +
      ' id does not return a params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(true);
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue(null);
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toBe(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return true for canActivate() when isLoggedIn === true,' +
      'and organization does not contain organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(false);
      urlSegment.toString.and.returnValue('users,1');
      mockParamMap.get.and.returnValue(null);
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toBe(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return false for canActivate() when isLoggedIn === true and' +
      'checkAuthorization === true and id returns params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(true);
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue('1');
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toBe(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
});
