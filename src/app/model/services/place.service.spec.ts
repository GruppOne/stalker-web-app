import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {MyLatLng} from '../classes/places/my-lat-lng';
import {PlaceDataBuilder} from '../classes/places/place-data';

import {HttpClientService} from './http-client.service';
import {PlaceService} from './place.service';

describe('PlaceService', () => {
  let service: PlaceService;

  const httpClient = jasmine.createSpyObj('HttpClient', [
    // 'post',
    'get',
    // 'put',
    // 'delete',
  ]);
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    'get',
    'put',
    'delete',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: HttpClientService, useValue: httpClientService},
      ],
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
  it('should get places', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(new HttpResponse({body: {places: []}, headers: new HttpHeaders(), status: 200})),
    );
    service.getOrgPlaces(1);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should get a single place', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {
            id: 1,
            data: new PlaceDataBuilder(
              {
                address: 'test',
                city: 'test',
                zipcode: 'test',
                state: 'test',
              },
              'test',
              [new MyLatLng(1, 1)],
              10,
            ).build(),
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = {
      id: 1,
      data: new PlaceDataBuilder(
        {
          address: 'test',
          city: 'test',
          zipcode: 'test',
          state: 'test',
        },
        'test',
        [new MyLatLng(1, 1)],
        10,
      ).build(),
    };
    service.getOrgPlaceById(1, 1).subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toBeTruthy();
  });
  it('should add a new place', () => {
    const httpGetSpy = httpClientService.post.and.returnValue(
      of(new HttpResponse({body: true, headers: new HttpHeaders(), status: 200})),
    );
    let result = false;
    service
      .addPlaceToOrg(
        1,
        new PlaceDataBuilder(
          {
            address: 'test',
            city: 'test',
            zipcode: 'test',
            state: 'test',
          },
          'test',
          [new MyLatLng(1, 1)],
          10,
        ).build(),
      )
      .subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toBe(true);
  });
  it('should delete a place', () => {
    const httpGetSpy = httpClientService.delete.and.returnValue(
      of(new HttpResponse({body: true, headers: new HttpHeaders(), status: 200})),
    );
    let result = false;
    service.deletePlaceInOrg(1, 1).subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toBe(true);
  });
  it('should put a place', () => {
    const httpGetSpy = httpClientService.put.and.returnValue(
      of(new HttpResponse({body: true, headers: new HttpHeaders(), status: 200})),
    );
    let result = false;
    service
      .updatePlaceInOrg(1, {
        id: 1,
        data: new PlaceDataBuilder(
          {
            address: 'test',
            city: 'test',
            zipcode: 'test',
            state: 'test',
          },
          'test',
          [new MyLatLng(1, 1)],
          10,
        ).build(),
      })
      .subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toBe(true);
  });
});
