import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';

describe('LoginService', () => {
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    // 'get',
    // 'put',
    // 'delete',
  ]);

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

  it('should call the login post', () => {
    const httpPostSpy = httpClientService.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );

    sut.login({email: 'default@mail', password: 'Default1!'});

    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });

  it('should call the login post with additional headers', () => {
    const httpPostSpy = httpClientService.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    const headers = new HttpHeaders({key: 'value'});

    sut.loginWithAdditionalHeader(
      {email: 'default@mail', password: 'Default1!'},
      headers,
    );

    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });
});
