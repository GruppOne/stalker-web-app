import {HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {UserService} from './user.service';

describe('UserService', () => {
  let service: UserService;
  const httpClient = jasmine.createSpyObj('HttpClient', [
    // 'post',
    'get',
    // 'put',
    // 'delete',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call httpClient get', () => {
    const httpGetSpy = httpClient.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.getUserById(1);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
