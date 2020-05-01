import {TestBed, async} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    url: '/',
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule],
      declarations: [AppComponent],
      providers: [{provide: Router, useValue: mockRouter}],
    }).compileComponents();
  }));

  let app: AppComponent;
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
});
