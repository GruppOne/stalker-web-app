import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LatLng} from 'leaflet';
import {LdapConfigurationBuilder} from 'src/app/model/classes/organizations/ldapConfiguration';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';

import {
  Organization,
  OrganizationBuilder,
} from '../../../model/classes/organizations/organization';
import {OrganizationService} from '../../../model/services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'edit-organization.component.html',
  styleUrls: ['edit-organization.component.scss'],
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

  /**
   *  Returns a FormArray with the name 'formArray'.
   */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationService: OrganizationService,
    public readonly route: ActivatedRoute,
  ) {}

  /**
   *  initialize all data, including organization field calling OrganizationService
   */
  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getOrganizationById(organizationId);
    if (!this.organization) {
      this.organization = new OrganizationBuilder(
        1,
        new OrganizationDataBuilder('GruppOne', true)
          .addPlaces([
            new PlaceBuilder([
              new MyLatLng(45.411564, 11.887473),
              new MyLatLng(45.411225, 11.887325),
              new MyLatLng(45.41111, 11.887784),
              new MyLatLng(45.41144, 11.88795),
            ])
              .addPlaceData(
                new PlaceDataBuilder('Via Trieste', 'Padova', '35031', 'Italia').build(),
              )
              .addName('Torre Archimede')
              .build(),
          ])
          .addDescription('lorem ipsum...')
          .addLdapConfiguration(
            new LdapConfigurationBuilder('127.0.0.1')
              .addUsername('mario')
              .addPassword('pass')
              .build(),
          )
          .build(),
      ).build();
    }
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          orgNameCtrl: [this.organization.data.name, Validators.required],
          orgDescriptionCtrl: [this.organization.data.description, Validators.required],
        }),
        this.formBuilder.group({
          orgHostCtrl: [
            this.organization.data.ldapConfiguration?.host,
            Validators.required,
          ],
          orgUserCtrl: [
            this.organization.data.ldapConfiguration?.username,
            Validators.required,
          ],
          orgPwdCtrl: [
            this.organization.data.ldapConfiguration?.password,
            Validators.required,
          ],
        }),
      ]),
    });
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrganizationById(id: number): void {
    this.organizationService.getOrganizationById(id).subscribe(
      (response: Organization) => (this.organization = response),
      (err: Error) => console.error(err),
    );
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
      const organizationDataBuilder = new OrganizationDataBuilder(
        this.formArray.value[0].orgNameCtrl,
        true,
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        .addCreatedDate(this.organization.data.createdDate as number)
        .addLastModifiedDate(this.organization.data.lastModifiedDate as number)
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
        organizationDataBuilder.addPlaces([
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
      this.organizationBuilder = new OrganizationBuilder(
        this.organization.id,
        organizationDataBuilder.build(),
      );
      console.log(this.organizationBuilder.build());
      this.organizationService
        .editOrganization(this.organizationBuilder.build())
        .subscribe(
          (response: boolean) => {
            console.log(response);
          },
          (err: Error) => console.error(err),
        );
    }
  }
}
