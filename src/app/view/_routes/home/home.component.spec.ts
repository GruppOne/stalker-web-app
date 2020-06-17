import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';

import {LoginService} from '../../../model/services/login.service';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let loginSpy;
  let userIdSpy;
  let userLoggedInSpy;
  const loginService = jasmine.createSpyObj('LoginService', [
    'login',
    'getUserId',
    'isLoggedIn',
  ]);
  beforeEach(async(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: LoginService, useValue: loginService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not validate incorrect input', () => {
    expect(component.validateInput('mariorossi', 'casualpass')).toBeFalse();
  });
  it('should validate correct input', () => {
    expect(component.validateInput('mariorossi@gmail.com', 'Casua1pass!')).toBeTrue();
  });
  it('should redirect to home page', () => {
    loginSpy = loginService.login.and.returnValue(of({email: 'test', password: 'test'}));
    userIdSpy = loginService.getUserId.and.returnValue('1');
    component.login('mariorossi@gmail.com', 'Casua1pass!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/1']);
    expect(loginSpy.calls.any()).toBe(true, 'login called');
    expect(userIdSpy.calls.any()).toBe(true, 'getUserId called');
  });
  it('should not redirect to home page in case of failed input validation', () => {
    component.login('mariorossi', 'casualpass');
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });

  it('should not redirect to home page in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    loginSpy = loginService.login.and.returnValue(throwError(''));
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    component.login('mario@rossi', 'Casua1pass!');
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });

  it('should set toggle to false', () => {
    component.translate(1);
    expect(component.toggle).toBeFalse();
  });

  it('should set toggle to true', () => {
    component.translate(0);
    expect(component.toggle).toBeTrue();
  });

  it('should not display login and recovery buttons if already logged in', () => {
    userLoggedInSpy = loginService.isLoggedIn.and.returnValue(true);
    expect(component.userLoggedIn()).toBe(true);
    expect(userLoggedInSpy.calls.any()).toBe(true);
  });

  it('should display login and recovery buttons if not logged in', () => {
    userLoggedInSpy = loginService.isLoggedIn.and.returnValue(false);
    expect(component.userLoggedIn()).toBe(false);
    expect(userLoggedInSpy.calls.any()).toBe(true);
  });
});
