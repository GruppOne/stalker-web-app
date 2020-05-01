import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    sut = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should get the user_id', () => {
    expect(sut.getUserId()).toBeNull();
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
    sut.logout();
    const result: boolean = sut.isLoggedIn();
    expect(result).toBe(false);
    sut.logout();
  });
  it('should check if the user isLoggedIn and return true', () => {
    sut.logout();
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
    sut.logout();
  });
  it('should check if the user has sufficient permissions given a token', () => {
    sut.logout();
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
    sut.logout();
  });
  it('should check if the user has sufficient permissions given a token', () => {
    sut.logout();
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
    sut.logout();
  });
});
