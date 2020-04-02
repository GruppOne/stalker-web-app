import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {StalkerEndpoint} from './stalker-endpoint';

describe('StalkerEndpoint', () => {
  let sut: StalkerEndpoint;

  let httpClient: HttpClient = jasmine.createSpyObj('HttpClient', [
    'post',
    'get',
    'put',
    'delete',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create an instance', () => {
    sut = new StalkerEndpoint(httpClient, '/');

    expect(sut).toBeTruthy();
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
