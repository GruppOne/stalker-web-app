import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap, UrlSegment, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Polygon, LatLng} from 'leaflet';
import {of} from 'rxjs';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
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
    of({id: 1, data: {name: 'unipd', isPrivate: false}}),
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
  const mockRouter = {
    url: '/create',
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async(() => {
    mockRouter.url = '/create';
    urlSegment.toString.and.returnValue('organization/1');
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: HttpClient},
        {provide: UrlSegment, useValue: urlSegment},
        {provide: Router, useValue: mockRouter},
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
    mockRouter.url = '/';
    expect(component).toBeTruthy();
  });
  // TODO check this test
  it('should create and not ask for organization places', () => {
    mockRouter.url = '/';
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', isPrivate: false}}),
    );
    urlSegment.toString.and.returnValue('create');
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    mockRouter.url = '/';
    organizationSpy = organizationService.getOrganizationById.and.returnValue(of(null));
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    mockRouter.url = '/';
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', isPrivate: false}}),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });

  it('should get and display place datas', () => {
    mockRouter.url = '/';
    geocode.display_name = correctName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    console.log = jasmine.createSpy('log');
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
    expect(console.log).toHaveBeenCalledTimes(7);
    console.log(geocode.display_name);
  });
  it('should get and not display incorrect place name', () => {
    mockRouter.url = '/';
    geocode.display_name = uncorrectName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    console.log = jasmine.createSpy('log');
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
    expect(console.log).toHaveBeenCalledTimes(7);
    console.log(geocode.display_name);
  });

  it('should delete place data', () => {
    const p = new PlaceBuilder(
      1,
      new PlaceDataBuilder(
        {
          address: 'Via Trieste2',
          city: 'Padova',
          zipcode: '35031',
          state: 'Italia',
        },
        'test',
        [
          new MyLatLng(45.41165, 11.886823),
          new MyLatLng(45.411528, 11.886592),
          new MyLatLng(45.411458, 11.886938),
        ],
      ).build(),
    ).build();
    component.organizationPlaces.push(p);
    component.deletePlace(1, 0);
    expect(component.organizationPlaces.length).toEqual(0);
    component.organizationPlaces.push(p);
    component.deletePlace(-1, 0);
    expect(component.organizationPlaces.length).toEqual(0);
    component.organizationPlaces.push(p);
    component.deletePlace(-1, -1);
    expect(component.organizationPlaces.length).toEqual(1);
  });
  it('should update place data', () => {
    const p = new PlaceBuilder(
      1,
      new PlaceDataBuilder(
        {
          address: 'Via Trieste2',
          city: 'Padova',
          zipcode: '35031',
          state: 'Italia',
        },
        'test',
        [
          new MyLatLng(45.41165, 11.886823),
          new MyLatLng(45.411528, 11.886592),
          new MyLatLng(45.411458, 11.886938),
        ],
      ).build(),
    ).build();
    component.organizationPlaces.push(p);
    component.updatePlace(0, 'test2', 'Trieste');
    expect(component.organizationPlaces[0].data.name).toEqual('test2');
    expect(component.organizationPlaces[0].data.placeInfo.address).toEqual('Trieste');
    component.updatePlace(-1, 'test', 'Trieste2');
    expect(component.organizationPlaces[0].data.name).toEqual('test2');
    expect(component.organizationPlaces[0].data.placeInfo.address).toEqual('Trieste');
  });
});
