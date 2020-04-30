import {TestBed, async} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  let mockRouter = {
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
    expect(app.getRoute()).toEqual('/');
  });
  it('should  route', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      url: '/',
    };
    app.backHome();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
  it('should  route', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      url: '/home',
    };
    app.backHome();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });
});
