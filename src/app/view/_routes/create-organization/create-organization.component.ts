import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {Place} from 'src/app/model/classes/places/place';
import {LoginService} from 'src/app/model/services/login.service';

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

  @ViewChild('map') mapDataChild!: {
    organizationPlaces: Place[];
    editOrganizationPlaces(orgId: number): Observable<boolean>;
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
    private readonly snackBar: MatSnackBar,
    private readonly loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          orgNameCtrl: ['', Validators.required],
          orgDescriptionCtrl: ['', Validators.required],
        }),
        this.formBuilder.group({
          orgUrlCtrl: ['', Validators.required],
          orgDnCtrl: ['', Validators.required],
          orgCnCtrl: ['', Validators.required],
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
      const organizationDataBuilder = new OrganizationDataBuilder(
        this.formArray.value[0].orgNameCtrl,
        this.toggle ? 'private' : 'public',
      )
        .addDescription(this.formArray.value[0].orgDescriptionCtrl)
        .addLdapConfiguration({
          url: this.formArray.value[1].orgUrlCtrl,
          baseDn: this.formArray.value[1].orgDnCtrl,
          bindRdn: `cn=${this.formArray.value[1].orgCnCtrl}`,
          bindPassword: this.formArray.value[1].orgPwdCtrl,
        });
      console.log(organizationDataBuilder.build());
      this.organizationService
        .addOrganization(
          organizationDataBuilder.build(),
          Number(this.loginService.getUserId()),
        )
        .subscribe(
          (response: number) => {
            this.mapDataChild.editOrganizationPlaces(response);
          },
          (err: Error) => {
            this.snackBar.open(err.toString(), 'Ok');
          },
        );
    }
  }
  public showLdapConfiguration(): void {
    this.toggle = !this.toggle;
  }
}
