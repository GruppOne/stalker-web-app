import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {PlaceService, Geocoding} from 'src/app/services/place.service';
import {of} from 'rxjs';
import {LatLng, Polygon} from 'leaflet';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  /*   const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);

  let organizationSpy; */
  let geoCodingSpy;
  const placeService = jasmine.createSpyObj('PlaceService', ['reverseGeocoding']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClient},
        /* {provide: OrganizationService, useValue: organizationService}, */
        {provide: PlaceService, useValue: placeService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*   it('should call the function ', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'function called');
  }); */
  it('should get the reverse', () => {
    const name = 'Via Trieste, Padova';
    const geocode: Geocoding = {
      display_name: name,
      address: {
        building: 'INAIL',
        city: 'Padova',
        country: 'Italia',
        postcode: '35031',
        road: 'Via Trieste',
      },
    };
    geoCodingSpy = placeService.reverseGeocoding.and.returnValue(of(geocode));
    console.log = jasmine.createSpy('log');
    component.onDrawCreated({
      layer: new Polygon([
        new LatLng(45.411564, 11.887473),
        new LatLng(45.411225, 11.887325),
        new LatLng(45.41111, 11.887784),
        new LatLng(45.41144, 11.88795),
      ]),
    });
    expect(geoCodingSpy.calls.any()).toBe(true, 'reverseGeocoding called');
    expect(console.log).toHaveBeenCalledTimes(7);
    console.log(geocode.display_name);
  });
});
