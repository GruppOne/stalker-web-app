import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
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
  @ViewChild('map') mapDataChild?: {
    arrayCoord: Polygon[];
    arrayName: string[];
    arrayRoad: string[];
    arrayPostcode: string[];
    arrayCity: string[];
    arrayCountry: string[];
  };

  organization?: Organization;
  OrganizationBuilder?: Organization;
  formGroup: FormGroup = new FormGroup({});

  // Returns a FormArray with the name 'formArray'.
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getOrganizationById(1);
    if (!this.organization) {
      this.organization = new OrganizationBuilder('GruppOne', true)
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
        .addDescription(
          'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor...',
        )
        .addLdapConfiguration(
          new LdapConfigurationBuilder('127.0.0.1')
            .addUsername('admin')
            .addPassword('root')
            .build(),
        )
        .build();
    }
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          orgNameCtrl: [this.organization.name, Validators.required],
          orgDescriptionCtrl: [this.organization.description, Validators.required],
        }),
        this.formBuilder.group({
          orgHostCtrl: [this.organization.ldapConfiguration?.host, Validators.required],
          orgUserCtrl: [
            this.organization.ldapConfiguration?.username,
            Validators.required,
          ],
          orgPwdCtrl: [
            this.organization.ldapConfiguration?.password,
            Validators.required,
          ],
        }),
        this.formBuilder.group({
          managerEmailCtrl: ['pippo@gmail.com', Validators.email],
          viewerEmailCtrl: ['pluto@gmail.com', Validators.email],
        }),
      ]),
    });
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

  // TODO controllo client side dei campi
  submitOrganizationForm(): void {
    if (this.mapDataChild) {
      console.log(this.formArray?.value);
      console.log(this.mapDataChild.arrayCoord);
      console.log(this.mapDataChild.arrayName);
      console.log(this.mapDataChild.arrayRoad);
      console.log(this.mapDataChild.arrayPostcode);
      console.log(this.mapDataChild.arrayCity);
      console.log(this.mapDataChild.arrayCountry);
    }
  }
}
