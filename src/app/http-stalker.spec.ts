import {HttpStalker} from './http-stalker';
import {HttpClient} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [HttpClient],
  });
}));

describe('HttpStalker', () => {
  it('should create an instance', () => {
    const fixture = TestBed.createComponent(HttpClient);
    const app = fixture.debugElement.componentInstance;
    expect(new HttpStalker(app)).toBeTruthy();
  });
});
