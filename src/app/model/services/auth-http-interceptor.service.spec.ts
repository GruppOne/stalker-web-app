import {HttpRequest} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {AuthHttpInterceptorService} from './auth-http-interceptor.service';

describe('AuthHttpInterceptorService', () => {
  const mockHttpHandler = {handle: jasmine.createSpy('handle')};
  const localStor = jasmine.createSpyObj('localStorage', [
    'getItem',
    'removeItem',
    'setItem',
  ]);
  let service: AuthHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: localStorage,
          useValue: localStor,
        },
      ],
    });
    Object.defineProperty(window, 'localStorage', {value: localStor});
    service = TestBed.inject(AuthHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // TODO might improve how to check expected results
  it('should not attach jwtToken if the request goes to the login endpoint', () => {
    const fakeHttpRequest = {url: 'user/login', clone: jasmine.createSpy('clone')};
    localStor.getItem.and.returnValue('nice');
    service.intercept(
      (fakeHttpRequest as unknown) as HttpRequest<unknown>,
      mockHttpHandler,
    );
    expect(mockHttpHandler.handle).toHaveBeenCalled();
  });
  it('should not attach jwtToken if the user is not logged in', () => {
    const fakeHttpRequest = {url: 'organizations', clone: jasmine.createSpy('clone')};
    localStor.getItem.and.returnValue(null);
    service.intercept(
      (fakeHttpRequest as unknown) as HttpRequest<unknown>,
      mockHttpHandler,
    );
    expect(mockHttpHandler.handle).toHaveBeenCalled();
  });
  it('should attach jwtToken if the user is already logged in', () => {
    const fakeHttpRequest = {url: 'organizations', clone: jasmine.createSpy('clone')};
    localStor.getItem.and.returnValue('nicer');
    service.intercept(
      (fakeHttpRequest as unknown) as HttpRequest<unknown>,
      mockHttpHandler,
    );
    expect(fakeHttpRequest.clone).toHaveBeenCalled();
  });
});
