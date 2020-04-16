import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {UserBuilder} from '../classes/users/user';

import {LoginService} from './login.service';

describe('LoginService', () => {
  const httpClient = jasmine.createSpyObj('HttpClient', [
    'post',
    // 'get',
    // 'put',
    // 'delete',
  ]);
  let mockHttpClient: HttpClient;

  let sut: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    mockHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    sut = new LoginService(httpClient);

    expect(sut).toBeTruthy();
  });

  it('should call the login post', () => {
    const httpPostSpy = httpClient.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );

    sut = new LoginService(mockHttpClient);
    // TODO should use a mock for this
    const user = new UserBuilder('default@mail', 'Default1!').build();

    sut.login(user);

    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });

  it('should call the login post with additional headers', () => {
    const httpPostSpy = httpClient.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );

    sut = new LoginService(mockHttpClient);
    // TODO should use a mock for this
    const user = new UserBuilder('default@mail', 'Default1!').build();
    const headers = new HttpHeaders({key: 'value'});

    sut.loginWithAdditionalHeader(user, headers);

    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });
});
