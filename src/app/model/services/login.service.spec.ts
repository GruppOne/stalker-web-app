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
    // 'get',
    // 'put',
    // 'delete',
  ]);
  const defaultUser = {email: 'default@mail', password: 'Default1!'};

  let httpPostSpy = httpClientService.post.and.returnValue(
    of(new HttpResponse({body: defaultUser, headers: new HttpHeaders(), status: 200})),
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
      ],
    });
    sut = TestBed.inject(LoginService);
    sut.logout();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should get the user_id', () => {
    expect(sut.getUserId()).toBeNull();
  });

  it('should log the user out and redirect to the home page', () => {
    sut.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('should call the httpClientService post', () => {
    httpPostSpy = httpClientService.post.and.returnValue(
      of(new HttpResponse({body: defaultUser, headers: new HttpHeaders(), status: 200})),
    );
    let result: {email: string; password: string} = {email: '', password: ''};
    sut.login(defaultUser).subscribe((response) => (result = response));
    expect(result).toEqual(defaultUser);
    sut.login(defaultUser);
    expect(result).toEqual(defaultUser);
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });

  it('should check if the user isLoggedIn and return false', () => {
    const result: boolean = sut.isLoggedIn();
    expect(result).toBe(false);
  });
  it('should check if the user isLoggedIn and return true', () => {
    httpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: defaultUser,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    sut.login(defaultUser).subscribe();
    const result: boolean = sut.isLoggedIn();
    expect(result).toBe(true);
  });
  it('should check if the user has sufficient permissions given a token', () => {
    httpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: defaultUser,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    sut.login(defaultUser).subscribe();
    const result: boolean = sut.checkAuthorization(1, AdminType.viewer);
    expect(result).toBe(true);
  });
  it('should check if the user has sufficient permissions given a token', () => {
    httpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: defaultUser,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    sut.login(defaultUser).subscribe();
    const result: boolean = sut.checkAuthorization(1, AdminType.owner);
    expect(result).toBe(false);
  });
});
