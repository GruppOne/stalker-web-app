import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {HttpClientService} from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;

  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient get', () => {
    const httpGetSpy = httpClient.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.get('url');
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should call httpClient post', () => {
    const httpPostSpy = httpClient.post.and.returnValue(
      of(
        new HttpResponse({
          body: null,
          headers: new HttpHeaders({'Content-Type': 'application/json'}),
          status: 200,
        }),
      ),
    );
    service.post('url', 'test');
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });

  it('should call httpClient get', () => {
    const httpPutSpy = httpClient.put.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.put('url', 'test');
    expect(httpPutSpy.calls.any()).toBe(true, 'get called');
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
});
