import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Organization} from '../models/organization';
import {OrganizationService} from '../services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'edit-organization.component.html',
  styleUrls: ['edit-organization.component.scss'],
})
export class EditOrganizationComponent implements OnInit {
  organization = new Organization();
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  fourthFormGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getOrganization(1);

    this.firstFormGroup = this.formBuilder.group({
      orgNameCtrl: [this.organization.Name, Validators.required],
      orgDescriptionCtrl: [this.organization.Description, Validators.required],
    });
    // this.secondFormGroup = this.formBuilder.group({});
    this.thirdFormGroup = this.formBuilder.group({
      orgHostCtrl: [this.organization.LdapConfiguration.Host, Validators.required],
      orgUserCtrl: [this.organization.LdapConfiguration.Username, Validators.required],
      orgPwdCtrl: [this.organization.LdapConfiguration.Password, Validators.required],
    });
  }

  getOrganization(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response.status === 200 && response.body != null) {
          this.organization = response.body;
        }
      });
  }
}
