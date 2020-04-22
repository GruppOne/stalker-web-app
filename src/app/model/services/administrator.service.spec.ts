import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {AdministratorService} from './administrator.service';

describe('AdministratorService', () => {
  const httpClient = jasmine.createSpyObj('HttpClient', [
    // 'post',
    // 'get',
    'put',
    // 'delete',
  ]);
  let mockHttpClient: HttpClient;

  let service: AdministratorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClient}],
    });
    mockHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    service = new AdministratorService(mockHttpClient);
    expect(service).toBeTruthy();
  });

  it('should call the administrators put', () => {
    const httpPutSpy = httpClient.put.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );

    service = new AdministratorService(mockHttpClient);
    service.manageAdministrator(1, 'test@gmail.com');
    expect(httpPutSpy.calls.any()).toBe(true, 'post called');
  });
});
