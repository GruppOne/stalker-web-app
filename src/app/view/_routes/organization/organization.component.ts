import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Administrator} from 'src/app/model/classes/administrator';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {OrganizationService} from 'src/app/model/services/organization.service';

import {
  Organization,
  OrganizationBuilder,
} from '../../../model/classes/organizations/organization';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  organization?: Organization;
  private readonly organizationBuilder?: OrganizationBuilder;
  administrators: Administrator[] = [];
  date: Date = new Date();
  /* eslint-disable max-params */
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly administratorService: AdministratorService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getOrganizationById(organizationId);
    this.organization = this.organizationBuilder?.build();
    this.getOrgAdministrators(organizationId);
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrganizationById(id: number): void {
    this.organizationService.getOrganizationById(id).subscribe(
      (response: Organization) => {
        this.organization = response;
        this.date = new Date(
          (this.organization?.data?.creationDateTime as unknown) as Date,
        );
        console.log(this.organization);
      },
      (err: Error) => console.error(err),
    );
  }

  deleteOrganizationById(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "Are you sure? Deleting an organization can't be undone.",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.organizationService.deleteOrganizationById(id).subscribe(() => {
          this.router.navigate(['/organizations']);
        });
      }
    });
  }

  /**
   * Get administrators of a certain organization
   */
  getOrgAdministrators(organizationId: number): void {
    this.administratorService.getAdministrators(organizationId).subscribe(
      (response: Administrator[]) => {
        this.administrators = response;
        console.log(this.administrators);
      },
      (err: Error) => console.error(err),
    );
  }
}
