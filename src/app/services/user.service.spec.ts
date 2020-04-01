import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {StalkerHttpClientService} from './stalker-http-client.service';
import {UserService} from './user.service';

describe('UserService', () => {
  let service: UserService;
  const httpStalker = jasmine.createSpyObj('StalkerHttpClientService', [
    'post',
    'get',
    'put',
    'delete',
  ]);
  const httpGetSpy = httpStalker.get.and.returnValue(
    of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: StalkerHttpClientService, useValue: httpStalker}],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call StalkerHttpClient service', () => {
    service.getUserById(1);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
