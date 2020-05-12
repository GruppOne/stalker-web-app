import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap, UrlSegment} from '@angular/router';
import {LatLng, Polygon} from 'leaflet';
import {of} from 'rxjs';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {PlaceService, Geocoding} from 'src/app/model/services/place.service';

import {MapComponent} from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);

  let organizationSpy = organizationService.getOrganizationById.and.returnValue(
    of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
  );

  let geoCodingSpy;
  const placeService = jasmine.createSpyObj('PlaceService', ['reverseGeocoding']);
  const uncorrectName = 'Via Trieste, Padova';
  const correctName = 'INAIL,Via Triest, Padova';
  const geocode: Geocoding = {
    display_name: uncorrectName,
    address: {
      city: 'Padova',
      country: 'Italia',
      postcode: '35031',
      road: 'Via Trieste',
    },
  };
  const archimedeTower = new Polygon([
    new LatLng(45.411564, 11.887473),
    new LatLng(45.411225, 11.887325),
    new LatLng(45.41111, 11.887784),
    new LatLng(45.41144, 11.88795),
  ]);
  beforeEach(async(() => {
    urlSegment.toString.and.returnValue('organization/1');
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClient},
        {provide: UrlSegment, useValue: urlSegment},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
              url: [urlSegment],
            },
          },
        },
        {provide: OrganizationService, useValue: organizationService},
        {provide: PlaceService, useValue: placeService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and ask for organization places', () => {
    expect(component).toBeTruthy();
  });
  // TODO check this test
  it('should create and not ask for organization places', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
    );
    urlSegment.toString.and.returnValue('create');
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });

  it('should get and display place datas', () => {
    geocode.display_name = correctName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    console.log = jasmine.createSpy('log');
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
    expect(console.log).toHaveBeenCalledTimes(6);
    console.log(geocode.display_name);
  });
  it('should get and not display incorrect place name', () => {
    geocode.display_name = uncorrectName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    console.log = jasmine.createSpy('log');
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
    expect(console.log).toHaveBeenCalledTimes(6);
    console.log(geocode.display_name);
  });
});
