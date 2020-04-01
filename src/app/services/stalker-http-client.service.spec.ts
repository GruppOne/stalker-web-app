import {HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {User, UserBuilder} from '../models/user';

import {StalkerHttpClientService} from './stalker-http-client.service';

describe('HttpStalkerService', () => {
  let service: StalkerHttpClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StalkerHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call post, get, put and delete of super with headers', () => {
    const httpPostSpy = spyOn(service.httpClient, 'post');
    const httpGetSpy = spyOn(service.httpClient, 'get');
    const httpPutSpy = spyOn(service.httpClient, 'put');
    const httpDeleteSpy = spyOn(service.httpClient, 'delete');
    const path = 'default/path';
    const body = new UserBuilder('default@gmail', 'Default1!').build();
    const headers = new HttpHeaders();
    service.post<User>(path, body, headers);
    service.get<User>(path, headers);
    service.put<User>(path, body, headers);
    service.delete<User>(path, headers);
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(httpPutSpy.calls.any()).toBe(true, 'put called');
    expect(httpDeleteSpy.calls.any()).toBe(true, 'delete called');
  });
  it('should call post, get, put and delete of super without headers', () => {
    const httpPostSpy = spyOn(service.httpClient, 'post');
    const httpGetSpy = spyOn(service.httpClient, 'get');
    const httpPutSpy = spyOn(service.httpClient, 'put');
    const httpDeleteSpy = spyOn(service.httpClient, 'delete');
    const path = 'default/path';
    const body = new UserBuilder('default@gmail', 'Default1!').build();
    service.post<User>(path, body);
    service.get<User>(path);
    service.put<User>(path, body);
    service.delete<User>(path);
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(httpPutSpy.calls.any()).toBe(true, 'put called');
    expect(httpDeleteSpy.calls.any()).toBe(true, 'delete called');
  });
});
