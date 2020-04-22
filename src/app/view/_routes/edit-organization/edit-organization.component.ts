import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {LatLng} from 'leaflet';
import {LdapConfigurationBuilder} from 'src/app/model/classes/ldapConfiguration';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';

import {Administrator, AdminType} from '../../../model/classes/administrator';
import {Organization, OrganizationBuilder} from '../../../model/classes/organization';
import {AdministratorService} from '../../../model/services/administrator.service';
import {OrganizationService} from '../../../model/services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'edit-organization.component.html',
  styleUrls: ['edit-organization.component.scss'],
})
export class EditOrganizationComponent implements OnInit {
  adminType: AdminType[] = [AdminType.manager, AdminType.viewer];

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

  administrators: Administrator[] = [];
  formGroup: FormGroup = new FormGroup({});

  /**
   *  Returns a FormArray with the name 'formArray'.
   */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationService: OrganizationService,
    private readonly administratorService: AdministratorService,
  ) {}

  /**
   *  initialize all data, including organization field calling OrganizationService
   */
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
          adminRole: [],
          adminEmail: [],
        }),
      ]),
    });
    // this.getOrgAdministrators(1);
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrganizationById(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<{organizations: Organization[]}>) => {
        if (response && response.status === 200 && response.body?.organizations != null) {
          this.organization = response.body.organizations[0];
        }
      });
  }

  // TODO client-side validation

  /**
   * Submit the organization form, organize all data in an Organization object and call
   * the service for updating the organization in the server
   */
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
      for (let i = 0; i < this.mapDataChild.arrayCoord?.length; i++) {
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
        .subscribe((response: HttpResponse<Organization>) => {
          console.log(response);
        });
    }
  }
  /**
   * Add administrator email and role to the administrators array defined above
   */

  addAdmin(): void {
    let adminData: AdminType;
    console.log(this.formArray?.value[2].adminRole);

    switch (this.formArray?.value[2].adminRole) {
      case 'Manager':
        adminData = AdminType.manager;
        break;
      case 'Viewer':
        adminData = AdminType.viewer;
        break;
      default:
        adminData = AdminType.viewer;
        break;
    }
    const admin: Administrator = {
      email: this.formArray?.value[2].adminEmail,
      role: adminData,
    };

    this.administratorService
      .manageAdministrator(1, admin.email)
      .subscribe((response: HttpResponse<string>) => {
        if (response && response.status === 200 && response.body != null) {
          this.administrators.push(admin);
        } else {
          this.administrators.push(admin);
          console.log('response status: ' + response?.status.toString());
        }
      });
  }
  /**
   * Remove administrator 'admin' from administrator array defined above
   */
  deleteAdmin(admin: Administrator): void {
    // get index in the administrators array of admin
    this.administratorService
      .manageAdministrator(1, admin.email)
      .subscribe((response: HttpResponse<string>) => {
        if (response && response.status === 200 && response.body != null) {
          const indexOf = this.administrators.indexOf(admin);
          this.administrators.splice(indexOf, 1);
        } else {
          console.log('response status: ' + response.status.toString());
        }
      });
  }
  /*   getAdministrators(organizationId: number): void {
    this.administratorService
      .getAdministrators(organizationId)
      .subscribe((response: HttpResponse<AdminGetType[]>) => {
        if (response && response.status === 200 && response.body != null) {
          this.administrators = response.body;
        }
      });
  }*/
}
