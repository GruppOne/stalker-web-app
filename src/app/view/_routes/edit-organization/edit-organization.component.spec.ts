import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {LatLng} from 'leaflet';
import {of, throwError} from 'rxjs';
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

  let organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
    of(null),
  );

  let organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
    of({name: 'unipd', isPrivate: false}),
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizationComponent, MapComponent],
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
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
      of({name: 'unipd', isPrivate: false}),
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
    spyOn(console, 'error').and.callThrough();
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    component.getOrganizationById(1);
    expect(console.error).toHaveBeenCalledWith('');
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of({organizations: [{name: 'unipd', isPrivate: false}]}),
    );
    component.getOrganizationById(1);
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should submit the form correctly', () => {
    const num = component.mapDataChild?.arrayCoord.push([new LatLng(0, 0)]);
    console.log(num);
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      of({name: 'unipd', isPrivate: false}),
    );
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(true, 'sumbit done');
  });

  it('should not submit the form in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      throwError(''),
    );
    component.submitOrganizationForm();
    expect(console.error).toHaveBeenCalledWith('');
  });
  /*   it('should not submit the form in case of empty organization', () => {
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue({
      name: 'unipd',
      isPrivate: false,
    });
    component.organization = {name: '', isPrivate: false};
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(false, 'submit not done');
  }); */
});
