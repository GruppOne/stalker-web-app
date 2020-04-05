import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {StalkerEndpoint} from './stalker-endpoint';

describe('StalkerEndpoint', () => {
  let sut: StalkerEndpoint;

  let httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    httpClient = TestBed.inject(HttpClient);
    // sut = TestBed.inject(StalkerEndpoint);
  });

  it('should create an instance', () => {
    sut = new StalkerEndpoint(httpClient, '/');
    expect(sut).toBeTruthy();
  });

  it('should call httpClient get', () => {
    const httpGetSpy = httpClient.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    httpClient.get();
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should call the login post', () => {
    const httpPostSpy = httpClient.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );

    sut = new StalkerEndpoint(httpClient, '/');
    sut.post('test');
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });
});

// TODO test error handler
/* it('should handle errors', () => {
    httpSpy = httpStalker.fakepost.and.returnValue(
      of(new HttpErrorResponse({error: null})),
    );
    const errorspy = jasmine.createSpy('handleError');
    service.login(new User());
    expect(errorspy.calls.any()).toBeTrue();
     expect(service.login(new User()).subscribe()).toEqual(
      new HttpResponse({body: null, headers: new HttpHeaders(), status: 400}),
    );
  }); */
