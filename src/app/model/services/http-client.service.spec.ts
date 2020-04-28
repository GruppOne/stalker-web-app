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
  it('should call httpClient delete', () => {
    const httpDeleteSpy = httpClient.delete.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.delete('url');
    expect(httpDeleteSpy.calls.any()).toBe(true, 'get called');
  });

  // TODO maybe improve this test
  it('should call httpClient post with additional headers', () => {
    const httpPostSpy = httpClient.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    const newHttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    service.post('url', 'test', newHttpHeaders);
    expect(httpPostSpy.calls.any()).toBe(true, 'get called');
  });
  /*   it('should handle errors', () => {
    const result = service.handleError('post');

    expect(result(new HttpErrorResponse({error: ''}))).toThrow();
  }); */
});
