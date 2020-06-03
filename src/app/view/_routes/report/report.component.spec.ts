import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ReportComponent} from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
    'getUsersInsidePlaces',
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: organizationService, useValue: organizationService}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update user charts', () => {
    component.updateUsersInsidePlacesChart();
    expect(component).toBeTruthy();
  });
});
