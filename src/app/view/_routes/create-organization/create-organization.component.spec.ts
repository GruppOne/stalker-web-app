import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap, Router, UrlSegment} from '@angular/router';
import {of, throwError} from 'rxjs';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {CustomMaterialModule} from 'src/app/modules/material.module';

import {MapComponent} from '../../components/map/map.component';

import {CreateOrganizationComponent} from './create-organization.component';

describe('CreateOrganizationComponent', () => {
  let component: CreateOrganizationComponent;
  let fixture: ComponentFixture<CreateOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'addOrganization',
  ]);

  const mockRouter = {
    url: '/create',
    navigate: jasmine.createSpy('navigate'),
  };
  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  let organizationSubmitSpy = organizationService.addOrganization.and.returnValue(
    of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
  );

  beforeEach(async(() => {
    urlSegment.toString.and.returnValue('create');
    TestBed.configureTestingModule({
      declarations: [CreateOrganizationComponent, MapComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: HttpClient},
        {provide: FormBuilder},
        {provide: OrganizationService, useValue: organizationService},
        {provide: Router, useValue: mockRouter},
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit the form correctly', () => {
    const num = component.mapDataChild?.organizationPlaces.push(
      new PlaceBuilder(
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
        ).build(),
      ).build(),
    );
    expect(num).toBeTruthy();
    organizationSubmitSpy = organizationService.addOrganization.and.returnValue(of(true));
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(true, 'sumbit done');
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should not submit the form in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    organizationSubmitSpy = organizationService.addOrganization.and.returnValue(
      throwError(''),
    );
    component.submitOrganizationForm();
    expect(console.error).toHaveBeenCalledWith('');
  });

  /*   it('should not submit the form if mapDataChild is undefined', () => {
    // eslint-disable-next-line id-blacklist
    component.mapDataChild = undefined;
    organizationSubmitSpy = organizationService.addOrganization.and.returnValue(
      of(false),
    );
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(false);
  });
 */
  it('should change toggle value', () => {
    component.showLdapConfiguration();
    expect(component.toggle).toBe(true);
  });
});
