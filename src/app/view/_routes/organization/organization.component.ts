import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {LdapConfigurationBuilder} from 'src/app/model/classes/ldapConfiguration';
import {OrganizationService} from 'src/app/model/services/organization.service';

import {Organization, OrganizationBuilder} from '../../../model/classes/organization';

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
      this.organization = new OrganizationBuilder('GruppOne', true)
        .addDescription(
          'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor...',
        )
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
      .subscribe((response: HttpResponse<{organizations: Organization[]}>) => {
        if (response && response.status === 200 && response.body?.organizations != null) {
          this.organizationBuilder = new OrganizationBuilder(
            response.body.organizations[0].name,
            response.body.organizations[0].isPrivate,
          );
          this.organization = this.organizationBuilder.build();
        }
      });
  }
}
