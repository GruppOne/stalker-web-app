import {Component, OnInit} from '@angular/core';
import {Organization} from '../organization';
import {OrganizationService} from '../organization.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  organization = new Organization();

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganization(1);
  }
  getOrganization(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response.status === 200 && response.body != null) {
          this.organization = response.body;
        }
      });
  }
}
