import {TestBed, async} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {LoginService} from './model/services/login.service';

describe('AppComponent', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    url: '/',
  };
  const loginService = jasmine.createSpyObj('LoginService', ['getUserId', 'isLoggedIn']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule],
      declarations: [AppComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: LoginService, useValue: loginService},
      ],
    }).compileComponents();
  }));

  let app: AppComponent;
  let userLoggedInSpy;

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should get route', () => {
    mockRouter.url = '/';
    expect(app.getRoute()).toEqual('/');
  });
  it('should route back to Home', () => {
    mockRouter.navigate = jasmine.createSpy('navigate');
    mockRouter.url = '/organizations';
    app.backHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('should not route back to home', () => {
    mockRouter.navigate = jasmine.createSpy('navigate');
    mockRouter.url = '/home';
    app.backHome();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });
  it('should generate the components tooltip ', () => {
    app.generateComponents();
    expect(app.componentsTooltip.length).toEqual(125);
  });

  it('should display buttons inside menu if user is logged in', () => {
    userLoggedInSpy = loginService.isLoggedIn.and.returnValue(true);
    expect(app.userLoggedIn()).toBe(true);
    expect(userLoggedInSpy.calls.any()).toBe(true);
  });

  it('should not display buttons inside menu if user is not logged in', () => {
    userLoggedInSpy = loginService.isLoggedIn.and.returnValue(false);
    expect(app.userLoggedIn()).toBe(false);
    expect(userLoggedInSpy.calls.any()).toBe(true);
  });
});
