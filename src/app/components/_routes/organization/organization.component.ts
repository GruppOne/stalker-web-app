import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {LdapConfigurationBuilder} from 'src/app/models/ldapConfiguration';
import {OrganizationService} from 'src/app/services/organization.service';

import {Organization, OrganizationBuilder} from '../../../models/organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  organization?: Organization;
  private organizationBuilder?: OrganizationBuilder;

  constructor(private readonly organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganizationById(1);
    if (!this.organization) {
      this.organization = new OrganizationBuilder('Unipd', true)
        .addDescription('')
        .addLdapConfiguration(
          new LdapConfigurationBuilder('127.0.0.1')
            .addUsername('mariorossi@gmail.com')
            .addPassword('password')
            .build(),
        )
        .build();
    }
  }
  getOrganizationById(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response && response.status === 200 && response.body != null) {
          this.organizationBuilder = new OrganizationBuilder(
            response.body.name,
            response.body.isPrivate,
          );
          this.organization = this.organizationBuilder.build();
        }
      });
  }
}