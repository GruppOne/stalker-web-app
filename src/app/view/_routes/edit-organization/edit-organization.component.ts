import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {Place} from 'src/app/model/classes/places/place';
import {LoginService} from 'src/app/model/services/login.service';

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
  @ViewChild('map') mapDataChild!: {
    organizationPlaces: Place[];
    editOrganizationPlaces(orgId: number): Observable<boolean>;
  };

  organization?: Organization;
  organizationBuilder?: OrganizationBuilder;
  formGroup: FormGroup = new FormGroup({});

  userLevel = 0;

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
    public readonly loginService: LoginService,
    private readonly snackBar: MatSnackBar,
  ) {}

  /**
   *  initialize all data, including organization field calling OrganizationService
   */
  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getOrganizationById(organizationId);
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          orgNameCtrl: [],
          orgDescriptionCtrl: [],
        }),
        this.formBuilder.group({
          orgUrlCtrl: [],
          orgDnCtrl: [],
          orgCnCtrl: [],
          orgPwdCtrl: [],
        }),
      ]),
    });
    this.getLevel();
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrganizationById(id: number): void {
    this.organizationService.getOrganizationById(id).subscribe(
      (response: Organization) => {
        this.organization = response;
        console.log(response);
        console.log(this.organization);
        this.formGroup = this.formBuilder.group({
          formArray: this.formBuilder.array([
            this.formBuilder.group({
              orgNameCtrl: [this.organization.data.name, Validators.required],
              orgDescriptionCtrl: [
                this.organization.data.description,
                Validators.required,
              ],
            }),
            this.formBuilder.group({
              orgUrlCtrl: [
                this.organization.data.ldapConfiguration?.url,
                Validators.required,
              ],
              orgDnCtrl: [
                this.organization.data.ldapConfiguration?.baseDn,
                Validators.required,
              ],
              orgCnCtrl: [
                this.organization.data.ldapConfiguration?.bindRdn,
                Validators.required,
              ],
              orgPwdCtrl: [
                this.organization.data.ldapConfiguration?.bindPassword,
                Validators.required,
              ],
            }),
          ]),
        });
      },
      (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
    );
  }

  // TODO client-side validation

  /**
   * Submit the organization form, organize all data in an Organization object and call
   * the service for updating the organization in the server
   */
  submitOrganizationForm(): void {
    if (this.formArray && this.organization) {
      const organizationDataBuilder = new OrganizationDataBuilder(
        this.formArray.value[0].orgNameCtrl,
        this.organization.data.organizationType,
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        .addLdapConfiguration({
          url: this.formArray.value[1].orgUrlCtrl,
          baseDn: this.formArray.value[1].orgDnCtrl,
          bindRdn: `cn=${this.formArray.value[1].orgCnCtrl}`,
          bindPassword: this.formArray.value[1].orgPwdCtrl,
        })
        .addCreatedDate(this.organization.data.creationDateTime as string)
        .addLastModifiedDate(this.organization.data.lastChangeDateTime as string);
      this.organizationBuilder = new OrganizationBuilder(
        this.organization.id,
        organizationDataBuilder.build(),
      );
      console.log(this.organizationBuilder.build());
      this.organizationService
        .editOrganization(this.organizationBuilder.build())
        .subscribe(
          () => {
            this.mapDataChild.editOrganizationPlaces(
              Number(this.route.snapshot.paramMap.get('id')),
            );
          },
          (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
        );
    }
  }
  getLevel(): void {
    this.userLevel = this.loginService.getUserRole(
      +(this.route.snapshot.paramMap.get('id') as string),
    );
  }
}
