import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs';
import {LoginService} from '../login.service';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const loginService = jasmine.createSpyObj('LoginService', ['login']);
  const loginSpy = loginService.login.and.returnValue(
    of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: LoginService, useValue: loginService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate correct input', () => {
    expect(component.validateInput('mariorossi', 'casualpass')).toBeFalse();
  });
  it('should not validate incorrect input', () => {
    expect(component.validateInput('mariorossi@gmail.com', 'Casua1pass!')).toBeTrue();
  });
  it('should redirect to home page', () => {
    component.login('mariorossi@gmail.com', 'Casua1pass!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(loginSpy.calls.any()).toBe(true, 'login called');
  });
  it('should not redirect to home page', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    component.login('mariorossi', 'casualpass');
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });
});
