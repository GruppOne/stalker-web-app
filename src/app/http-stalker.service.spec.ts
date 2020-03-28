import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {HttpStalkerService} from './http-stalker.service';

describe('HttpStalkerService', () => {
  let service: HttpStalkerService;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(HttpStalkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
