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
import {PlaceService, Geocoding} from 'src/app/model/services/place.service';

import {MapComponent} from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  const testPlaceInfo = {
    address: 'test',
    city: 'test',
    zipcode: 'test',
    state: 'test',
  };

  let geoCodingSpy;
  const placeService = jasmine.createSpyObj('PlaceService', [
    'reverseGeocoding',
    'getOrgPlaces',
    'deletePlaceInOrg',
    'updatePlaceInOrg',
    'addPlaceToOrg',
  ]);
  const uncorrectName = 'Via Trieste, Padova';
  const correctName = 'INAIL,Via Triest, Padova';
  let organizationSpy = placeService.getOrgPlaces.and.returnValue(
    of([
      new PlaceBuilder(
        1,
        new PlaceDataBuilder(testPlaceInfo, 'test', [new MyLatLng(1, 1)], 10).build(),
      ).build(),
      new PlaceBuilder(
        1,
        new PlaceDataBuilder(testPlaceInfo, 'test', [new MyLatLng(1, 1)], 10).build(),
      ).build(),
    ]),
  );
  placeService.deletePlaceInOrg.and.returnValue(of(true));
  placeService.updatePlaceInOrg.and.returnValue(of(true));
  placeService.addPlaceToOrg.and.returnValue(of(true));
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
        {provide: PlaceService, useValue: placeService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and receive empty organization', () => {
    mockRouter.url = '/';
    expect(component).toBeTruthy();
  });
  it('should create and ask for organization places with complete response', () => {
    mockRouter.url = '/';
    organizationSpy = placeService.getOrgPlaces.and.returnValue(
      of([
        new PlaceBuilder(
          1,
          new PlaceDataBuilder(
            {
              address: 'Via Trieste',
              city: 'Padova',
              zipcode: '35010',
              state: 'Italia',
            },
            'Torre Archimede',
            [],
            10,
          ).build(),
        ).build(),
      ]),
    );
    urlSegment.toString.and.returnValue('create');
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    mockRouter.url = '/';
    organizationSpy = placeService.getOrgPlaces.and.returnValue(of([]));
    component.getOrgPlaces(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    mockRouter.url = '/';
    organizationSpy = placeService.getOrgPlaces.and.returnValue(
      of([
        new PlaceBuilder(
          1,
          new PlaceDataBuilder(
            {
              address: 'Via Trieste',
              city: 'Padova',
              zipcode: '35010',
              state: 'Italia',
            },
            'Torre Archimede',
            [],
            10,
          ).build(),
        ).build(),
      ]),
    );
    component.getOrgPlaces(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });

  it('should get and display place datas', () => {
    mockRouter.url = '/';
    geocode.display_name = correctName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
  });
  it('should get and not display incorrect place name', () => {
    mockRouter.url = '/';
    geocode.display_name = uncorrectName;
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    component.onDrawCreated({
      layer: archimedeTower,
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
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
        10,
      ).build(),
    ).build();
    component.organizationPlaces = [p];
    component.deletePlace(1, 0);
    expect(component.organizationPlaces.length).toEqual(0);
    component.organizationPlaces = [p];
    component.deletePlace(-1, 0);
    expect(component.organizationPlaces.length).toEqual(0);
    component.organizationPlaces = [p];
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
        10,
      ).build(),
    ).build();
    component.organizationPlaces.push(p);
    const p2 = new PlaceBuilder(
      -1,
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
        10,
      ).build(),
    ).build();
    component.organizationPlaces.push(p2);
    component.updatePlace(0, 'test2', 'Trieste');
    expect(component.organizationPlaces[0].data.name).toEqual('test2');
    expect(component.organizationPlaces[0].data.placeInfo.address).toEqual('Trieste');
    component.updatePlace(-1, 'test', 'Trieste2');
    expect(component.organizationPlaces[0].data.name).toEqual('test2');
    expect(component.organizationPlaces[0].data.placeInfo.address).toEqual('Trieste');
    component.editOrganizationPlaces(1);
  });

  it('should generate a random hex color', () => {
    const color = component.getRandomColor();
    const regexp = new RegExp('^#[A-D0-9]{6,6}$');
    expect(regexp.test(color)).toEqual(true);
  });

  it('should generate a random hex color', () => {
    const p = {
      latitude: 20,
      longitude: 20,
    };
    const newPolyline: {latitude: number; longitude: number}[] = [p];
    const latLngs = component.getLatLng(newPolyline);
    expect(latLngs.length).toEqual(1);
  });
});
