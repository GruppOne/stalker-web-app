import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Polygon, LatLng} from 'leaflet';
import {LdapConfigurationBuilder} from 'src/app/models/ldapConfiguration';
import {PlaceBuilder} from 'src/app/models/place';

import {Organization, OrganizationBuilder} from '../../../models/organization';
import {OrganizationService} from '../../../services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'edit-organization.component.html',
  styleUrls: ['edit-organization.component.scss'],
})
export class EditOrganizationComponent implements OnInit {
  organization?: Organization;

  OrganizationBuilder?: Organization;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  fourthFormGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getOrganizationById(1);
    if (!this.organization) {
      this.organization = new OrganizationBuilder('name', true)
        .addPlaces([
          new PlaceBuilder(
            new Polygon([
              new LatLng(45.411564, 11.887473),
              new LatLng(45.411225, 11.887325),
              new LatLng(45.41111, 11.887784),
              new LatLng(45.41144, 11.88795),
            ]),
          ).build(),
        ])
        .addDescription('lore ipsum...')
        .addLdapConfiguration(
          new LdapConfigurationBuilder('127.0.0.1')
            .addUsername('mario')
            .addPassword('pass')
            .build(),
        )
        .build();
    }
    if (this.organization) {
      this.firstFormGroup = this.formBuilder.group({
        orgNameCtrl: [this.organization?.name, Validators.required],
        orgDescriptionCtrl: [this.organization?.description, Validators.required],
      });
      // this.secondFormGroup = this.formBuilder.group({});
      this.thirdFormGroup = this.formBuilder.group({
        orgHostCtrl: [this.organization?.ldapConfiguration?.host, Validators.required],
        orgUserCtrl: [
          this.organization?.ldapConfiguration?.username,
          Validators.required,
        ],
        orgPwdCtrl: [this.organization?.ldapConfiguration?.password, Validators.required],
      });
    }
  }
  getOrganizationById(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response && response.status === 200 && response.body != null) {
          this.organization = response.body;
        }
      });
  }
}
