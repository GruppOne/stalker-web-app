import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {CustomMaterialModule} from 'src/app/modules/material.module';

import {MapComponent} from '../../components/map/map.component';

import {EditOrganizationComponent} from './edit-organization.component';

describe('EditOrganizationComponent', () => {
  let component: EditOrganizationComponent;
  let fixture: ComponentFixture<EditOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
    'editOrganization',
  ]);
  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  let organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
    of({id: 1, data: {name: 'unipd', organizationType: 'private'}}),
  );

  let organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
    of(true),
  );

  beforeEach(async(() => {
    urlSegment.toString.and.returnValue('organization/1');
    TestBed.configureTestingModule({
      declarations: [EditOrganizationComponent, MapComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: HttpClient},
        {provide: FormBuilder},
        {provide: OrganizationService, useValue: organizationService},
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
    fixture = TestBed.createComponent(EditOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create with organization got from http request', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', organizationType: 'private'}}),
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should create without organization got from http request', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    component.getOrganizationById(1);
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', organizationType: 'private'}}),
    );
    component.getOrganizationById(1);
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should submit the form correctly', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', organizationType: 'private'}}),
    );
    component.getOrganizationById(1);
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
          10,
        ).build(),
      ).build(),
    );
    // don't remove from here
    console.log(num);
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      of(true),
    );
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(true, 'sumbit done');
  });

  it('should not submit the form in case of http errors', () => {
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      throwError(''),
    );
    component.submitOrganizationForm();
  });
  /*   it('should not submit the form in case of empty organization', () => {
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue({
      name: 'unipd',
      organizationType:'private',
    });
    component.organization = {name: '', organizationType:'private'};
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(false, 'submit not done');
  }); */
});
