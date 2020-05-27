import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUsersListComponent } from './organization-users-list.component';

describe('OrganizationUsersListComponent', () => {
  let component: OrganizationUsersListComponent;
  let fixture: ComponentFixture<OrganizationUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
