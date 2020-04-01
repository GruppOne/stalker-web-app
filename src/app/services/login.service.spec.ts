import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {UserBuilder} from '../models/user';

import {LoginService} from './login.service';
import {StalkerHttpClientService} from './stalker-http-client.service';

describe('LoginService', () => {
  let service: LoginService;
  const httpStalker = jasmine.createSpyObj('StalkerHttpClientService', [
    'post',
    'get',
    'put',
    'delete',
  ]);
  const httpPostSpy = httpStalker.post.and.returnValue(
    of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: StalkerHttpClientService, useValue: httpStalker}],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call httpStalker service', () => {
    service.login(new UserBuilder('default@mail', 'Default1!').build());
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });
  /* it('should handle errors', () => {
    httpSpy = httpStalker.fakepost.and.returnValue(
      of(new HttpErrorResponse({error: null})),
    );
    const errorspy = jasmine.createSpy('handleError');
    service.login(new User());
    expect(errorspy.calls.any()).toBeTrue();
     expect(service.login(new User()).subscribe()).toEqual(
      new HttpResponse({body: null, headers: new HttpHeaders(), status: 400}),
    );
  }); */
});
