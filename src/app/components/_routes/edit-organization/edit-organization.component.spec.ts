import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';

import {OrganizationService} from '../../../services/organization.service';

import {EditOrganizationComponent} from './edit-organization.component';

describe('EditOrganizationComponent', () => {
  let component: EditOrganizationComponent;
  let fixture: ComponentFixture<EditOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);

  let organizationSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizationComponent],
      imports: [HttpClientTestingModule],
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

  it('should call the function ', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'function called');
  });
});
