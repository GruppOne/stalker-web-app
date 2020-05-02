import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateOrganizationComponent} from './create-organization.component';
import {of, throwError} from 'rxjs';
import {LatLng} from 'leaflet';
import {MapComponent} from '../../components/map/map.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {CustomMaterialModule} from 'src/app/modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient} from '@angular/common/http';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {ActivatedRoute, convertToParamMap, Router, UrlSegment} from '@angular/router';

describe('CreateOrganizationComponent', () => {
  let component: CreateOrganizationComponent;
  let fixture: ComponentFixture<CreateOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'addOrganization',
  ]);

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  let organizationSubmitSpy = organizationService.addOrganization.and.returnValue(
    of({name: 'unipd', isPrivate: false}),
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
    const num = component.mapDataChild?.arrayCoord.push([new LatLng(0, 0)]);
    console.log(num);
    organizationSubmitSpy = organizationService.addOrganization.and.returnValue(
      of({name: 'unipd', isPrivate: false}),
    );
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
});
