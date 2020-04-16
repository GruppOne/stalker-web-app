import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {OrganizationService} from 'src/app/model/services/organization.service';

import {EditOrganizationComponent} from './editorganization.component';

describe('EditOrganizationComponent', () => {
  let component: EditOrganizationComponent;
  let fixture: ComponentFixture<EditOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);

  let organizationSpy = organizationService.getOrganizationById.and.returnValue(
    of(
      new HttpResponse({
        body: {organizations: []},
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizationComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        {provide: HttpClient},
        {provide: FormBuilder},
        {provide: OrganizationService, useValue: organizationService},
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

  it('should call Organization get and handle empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: []},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: [{name: 'unipd', isPrivate: false}]},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
});
