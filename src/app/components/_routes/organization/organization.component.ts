import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {Organization} from '../../../models/organization';
import {OrganizationService} from '../../../services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  organization?: Organization;

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
