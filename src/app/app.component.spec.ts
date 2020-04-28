import {TestBed, async} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule],
      declarations: [AppComponent],
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
});
