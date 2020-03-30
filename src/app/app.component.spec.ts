import {AppComponent} from './app.component';
import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
