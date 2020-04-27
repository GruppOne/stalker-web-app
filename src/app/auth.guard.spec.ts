import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthGuard} from './auth.guard';
import {LoginService} from './model/services/login.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const loginService = jasmine.createSpyObj('LoginService', ['login']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: LoginService, useValue: loginService},
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
