import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {PlaceService} from './place.service';

describe('PlaceService', () => {
  let service: PlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient}],
    });
    service = TestBed.inject(PlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});