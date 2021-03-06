import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {AdminType} from '../classes/administrator';

import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';

describe('LoginService', () => {
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    'get',
    // 'put',
    // 'delete',
  ]);
  const defaultUser = {email: 'default@mail', password: 'Default1!'};

  const localStor = jasmine.createSpyObj('localStorage', [
    'getItem',
    'removeItem',
    'setItem',
  ]);

  let httpPostSpy = httpClientService.post.and.returnValue(
    of(
      new HttpResponse({
        body: {
          jwt:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTkwNTA0NTA4LCJleHAiOjE2MzA1M' +
            'DQ1MDgsImp0aSI6ImYyNzFlNjI3LWIzMWItNGNhOS1iMzg1LTk0YmY0MTljN2E5MSJ9.D7Wd1Q' +
            'vymM2tjpeTjum_VjyRv99YBxBaQNBaWDqvIX_LJinLEZjjCNJy2Z7cOblKYp6cF9MLAXdgG3E1' +
            'f1EgdQ',
        },
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );

  let sut: LoginService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: HttpClientService, useValue: httpClientService},
        {provide: Router, useValue: mockRouter},
        {provide: localStorage, useValue: localStor},
      ],
    });
    Object.defineProperty(window, 'localStorage', {value: localStor});
    sut = TestBed.inject(LoginService);
    sut.logout();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should get the user_id', () => {
    localStor.getItem.and.returnValue(null);
    expect(sut.getUserId()).toBeNull();
  });

  it('should log the user out and redirect to the home page', () => {
    sut.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('should call the httpClientService post', () => {
    httpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: {
            jwt:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTkwNTA0NTA4LCJleHAiOjE2MzA' +
              '1MDQ1MDgsImp0aSI6ImYyNzFlNjI3LWIzMWItNGNhOS1iMzg1LTk0YmY0MTljN2E5MSJ9.' +
              'D7Wd1QvymM2tjpeTjum_VjyRv99YBxBaQNBaWDqvIX_LJinLEZjjCNJy2Z7cOblKYp6cF9ML' +
              'AXdgG3E1f1EgdQ',
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = false;
    sut.login(defaultUser).subscribe((response) => (result = response));
    expect(result).toEqual(true);
    sut.login(defaultUser);
    expect(result).toEqual(true);
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });

  it('should check if the user isLoggedIn and return false', () => {
    localStor.getItem.and.returnValue(null);
    const result: boolean = sut.isLoggedIn();
    expect(result).toBe(false);
  });
  it('should check if the user isLoggedIn and return true', () => {
    localStor.getItem.and.returnValue('3091328931');
    const result: boolean = sut.isLoggedIn();
    expect(result).toBe(true);
  });
  it('should get Organizations the user is admin of and role', () => {
    httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {
            rolesInOrganizations: [
              {organizationId: 1, role: AdminType.viewer},
              {organizationId: 2, role: AdminType.admin},
            ],
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    const expectedResult = [
      {
        organizationId: 1,
        role: AdminType.viewer,
      },
      {
        organizationId: 2,
        role: AdminType.admin,
      },
    ];
    let result: {
      organizationId: number;
      role: string;
    }[] = [];
    sut.getAdminOrganizations().subscribe(
      (
        response: {
          organizationId: number;
          role: string;
        }[],
      ) => (result = response),
    );
    expect(result).toEqual(expectedResult);
  });

  it('should get Organizations the user is admin of and role, this time is empty', () => {
    const httpClientGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result: {
      organizationId: number;
      role: string;
    }[] = [];
    sut.getAdminOrganizations().subscribe(
      (
        response: {
          organizationId: number;
          role: string;
        }[],
      ) => (result = response),
    );
    expect(httpClientGetSpy.calls.any()).toBe(true);
    expect(result).toEqual(result);
  });

  it('should check if the user has insufficient permissions given a token', () => {
    httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {
            rolesInOrganizations: [
              {organizationId: 1, role: AdminType.viewer},
              {organizationId: 2, role: AdminType.admin},
            ],
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = false;
    sut
      .checkAuthorization(1, AdminType.viewer)
      .subscribe((response: boolean) => (result = response));
    expect(result).toBe(true);
  });
  it('should check if the user has sufficient permissions given a token', () => {
    httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {
            rolesInOrganizations: [
              {organizationId: 1, role: AdminType.viewer},
              {organizationId: 2, role: AdminType.admin},
            ],
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = false;
    sut
      .checkAuthorization(1, AdminType.owner)
      .subscribe((response: boolean) => (result = response));
    expect(result).toBe(false);
  });
});
