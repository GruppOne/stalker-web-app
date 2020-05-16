import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LdapConfigurationBuilder} from 'src/app/model/classes/organizations/ldapConfiguration';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {Place} from 'src/app/model/classes/places/place';

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
    organizationPlaces: Place[];
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
        +(this.route.snapshot.paramMap.get('id') as string),
        new OrganizationDataBuilder('GruppOne', true)
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
      const organizationDataBuilder = new OrganizationDataBuilder(
        this.formArray.value[0].orgNameCtrl,
        true,
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        .addLdapConfiguration(
          new LdapConfigurationBuilder(this.formArray.value[1].orgHostCtrl)
            .addUsername(this.formArray.value[1].orgUserCtrl)
            .addPassword(this.formArray.value[1].orgPwdCtrl)
            .build(),
        );
      organizationDataBuilder.addPlaces(this.mapDataChild.organizationPlaces);
      this.organizationBuilder = new OrganizationBuilder(
        this.organization.id,
        organizationDataBuilder.build(),
      );
      this.organizationService
        .editOrganization(this.organizationBuilder.build())
        .subscribe(
          () => {},
          (err: Error) => console.error(err),
        );
    }
  }
}
