import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {PlaceService} from './place.service';

describe('PlaceService', () => {
  let service: PlaceService;

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
    service = TestBed.inject(PlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient get', () => {
    const httpGetSpy = httpClient.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.reverseGeocoding(120000, 120000);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
