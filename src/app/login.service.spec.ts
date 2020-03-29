import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HttpStalkerService} from './http-stalker.service';
import {of} from 'rxjs';
import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {User} from './user';

describe('LoginService', () => {
  let service: LoginService;
  const httpStalker = jasmine.createSpyObj('HttpStalkerService', ['fakepost']);
  const httpSpy = httpStalker.fakepost.and.returnValue(
    of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpStalkerService, useValue: httpStalker}],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call httpStalker service', () => {
    service.login(new User());
    expect(httpSpy.calls.any()).toBe(true, 'fakepost called');
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
