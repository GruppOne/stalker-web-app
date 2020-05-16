import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LdapConfigurationBuilder} from 'src/app/model/classes/organizations/ldapConfiguration';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {Place} from 'src/app/model/classes/places/place';

import {AdminType} from '../../../model/classes/administrator';
import {OrganizationBuilder} from '../../../model/classes/organizations/organization';
import {OrganizationService} from '../../../model/services/organization.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss'],
})
export class CreateOrganizationComponent implements OnInit {
  toggle = false;

  adminType: AdminType[] = [AdminType.manager, AdminType.viewer];

  @ViewChild('map') mapDataChild?: {
    organizationPlaces: Place[];
  };
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
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          orgNameCtrl: ['', Validators.required],
          orgDescriptionCtrl: ['', Validators.required],
        }),
        this.formBuilder.group({
          orgHostCtrl: ['', Validators.required],
          orgUserCtrl: ['', Validators.required],
          orgPwdCtrl: ['', Validators.required],
        }),
      ]),
    });
  }

  /**
   * Submit the organization form, organize all data in an Organization object and call
   * the service for updating the organization in the server
   */
  submitOrganizationForm(): void {
    if (this.mapDataChild && this.formArray) {
      console.log(this.formArray.value);
      const organizationDataBuilder = new OrganizationDataBuilder(
        this.formArray.value[0].orgNameCtrl,
        this.toggle,
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        // .addCreatedDate(this.organization.organizationData.creationDateTime as string)
        // .addLastModifiedDate(
        // this.organization.organizationData.lastChangeDateTime as string,
        // )
        .addLdapConfiguration(
          new LdapConfigurationBuilder(this.formArray.value[1].orgHostCtrl)
            .addUsername(this.formArray.value[1].orgUserCtrl)
            .addPassword(this.formArray.value[1].orgPwdCtrl)
            .build(),
        );
      organizationDataBuilder.addPlaces(this.mapDataChild.organizationPlaces);
      console.log(organizationDataBuilder.build());
      this.organizationService.addOrganization(organizationDataBuilder.build()).subscribe(
        (response: boolean) => {
          console.log(response);
          this.router.navigate([`/organizations`]);
        },
        (err: Error) => console.error(err),
      );
    }
  }
  public showLdapConfiguration(): void {
    this.toggle = !this.toggle;
  }
}
