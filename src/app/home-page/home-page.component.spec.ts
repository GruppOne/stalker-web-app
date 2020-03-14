import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HomePageComponent} from "./home-page.component";
import {By} from "@angular/platform-browser";

describe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the user name", () => {
    fixture.detectChanges();
    const username = fixture.debugElement.query(By.css(".navbar-brand"));
    expect(username).toBeTruthy();
    expect(username.nativeElement.textContent.trim()).toBe("Welcome: " + component.user);
  });
});
