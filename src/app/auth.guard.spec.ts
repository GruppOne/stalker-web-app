import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router, UrlSegment, ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Observable} from 'rxjs';

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
    'getUserId',
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
    loginService.checkAuthorization.and.returnValue(of(false));
    const result = guard.canActivate({
      url: [
        {
          path: 'organization',
        } as UrlSegment,
      ],
    } as ActivatedRouteSnapshot);
    expect(result).toEqual(false);
    expect(loginService.redirectUrl).toBeUndefined();
  });
  it(
    'should return false for canActivate() when isLoggedIn === true and ' +
      'checkAuthorization === false and id returns params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(false));
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue('1');
      let result = true;
      (guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot) as Observable<boolean>).subscribe(
        (response: boolean) => (result = response),
      );
      expect(result).toEqual(false);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );

  it(
    'should return true for canActivate() when isLoggedIn === true and ' +
      ' id does not return a params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(true));
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue(null);
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toEqual(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return true for canActivate() when isLoggedIn === true, ' +
      'and url does not contain organization or user',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(false));
      urlSegment.toString.and.returnValue('test,1');
      mockParamMap.get.and.returnValue(null);
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toEqual(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return true for canActivate() when isLoggedIn === true and ' +
      'checkAuthorization === true and id returns params and url contains organization',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(true));
      urlSegment.toString.and.returnValue('organizations,1');
      mockParamMap.get.and.returnValue('1');
      let result = false;
      (guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot) as Observable<boolean>).subscribe(
        (response: boolean) => (result = response),
      );
      expect(result).toEqual(true);
      expect(loginService.redirectUrl).toBeUndefined();
    },
  );
  it(
    'should return true for canActivate() when isLoggedIn === true and ' +
      'url contains user and user has permission',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(true));
      urlSegment.toString.and.returnValue('user/,1');
      const userSpy = loginService.getUserId.and.returnValue('1');
      mockParamMap.get.and.returnValue('1');
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toEqual(true);
      expect(loginService.redirectUrl).toBeUndefined();
      expect(userSpy.calls.any()).toBe(true);
    },
  );
  it(
    'should return false for canActivate() when isLoggedIn === true and ' +
      'url contains user and user has not enough permissions',
    () => {
      loginService.isLoggedIn.and.returnValue(true);
      loginService.checkAuthorization.and.returnValue(of(true));
      urlSegment.toString.and.returnValue('user/,1');
      const userSpy = loginService.getUserId.and.returnValue('1');
      mockParamMap.get.and.returnValue('2');
      const result = guard.canActivate(({
        url: [urlSegment],
        paramMap: mockParamMap,
        data: {roles: AdminType.viewer},
      } as unknown) as ActivatedRouteSnapshot);
      expect(result).toEqual(false);
      expect(loginService.redirectUrl).toBeUndefined();
      expect(userSpy.calls.any()).toBe(true);
    },
  );
});
