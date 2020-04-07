import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {LatLng} from 'leaflet';
import {LdapConfigurationBuilder} from 'src/app/models/ldapConfiguration';
import {MyLatLng} from 'src/app/models/my-lat-lng';
import {PlaceBuilder} from 'src/app/models/place';
import {PlaceDataBuilder} from 'src/app/models/place-data';

import {Organization, OrganizationBuilder} from '../../../models/organization';
import {OrganizationService} from '../../../services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'editorganization.component.html',
  styleUrls: ['editorganization.component.scss'],
})
export class EditOrganizationComponent implements OnInit {
  @ViewChild('map') mapDataChild?: {
    arrayCoord: LatLng[][];
    arrayName: string[];
    arrayRoad: string[];
    arrayPostcode: string[];
    arrayCity: string[];
    arrayCountry: string[];
  };

  organization?: Organization;
  organizationBuilder?: OrganizationBuilder;
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
          new PlaceBuilder([
            new MyLatLng(45.411564, 11.887473),
            new MyLatLng(45.411225, 11.887325),
            new MyLatLng(45.41111, 11.887784),
            new MyLatLng(45.41144, 11.88795),
          ]).build(),
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
        .addId(2)
        .addCreatedDate('2020-04-07T02:00:00Z')
        .addLastModifiedDate('2020-04-07T02:00:00Z')
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
    if (this.mapDataChild && this.formArray && this.organization) {
      console.log(this.formArray.value);
      console.log(this.mapDataChild.arrayCoord);
      console.log(this.mapDataChild.arrayName);
      console.log(this.mapDataChild.arrayRoad);
      console.log(this.mapDataChild.arrayPostcode);
      console.log(this.mapDataChild.arrayCity);
      console.log(this.mapDataChild.arrayCountry);
      this.organizationBuilder = new OrganizationBuilder(
        this.formArray.value[0].orgNameCtrl,
        true,
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        .addId(this.organization.id as number)
        .addCreatedDate(this.organization.createdDate as string)
        .addLastModifiedDate(this.organization.lastModifiedDate as string)
        .addLdapConfiguration(
          new LdapConfigurationBuilder(this.formArray.value[1].orgHostCtrl)
            .addUsername(this.formArray.value[1].orgUserCtrl)
            .addPassword(this.formArray.value[1].orgPwdCtrl)
            .build(),
        );
      for (let i = 0; i < this.mapDataChild.arrayCoord.length; i++) {
        const polyline: MyLatLng[] = [];
        for (const j of this.mapDataChild.arrayCoord[i]) {
          polyline.push(new MyLatLng(200, 200, j));
        }
        this.organizationBuilder.addPlaces([
          new PlaceBuilder(polyline)
            .addName(this.mapDataChild.arrayName[i])
            .addPlaceData(
              new PlaceDataBuilder(
                this.mapDataChild.arrayRoad[i],
                this.mapDataChild.arrayCity[i],
                this.mapDataChild.arrayPostcode[i],
                this.mapDataChild.arrayCountry[i],
              ).build(),
            )
            .build(),
        ]);
      }
      console.log(this.organizationBuilder.build());
      this.organizationService
        .editOrganization(this.organizationBuilder.build())
        .subscribe();
    }
  }
}
