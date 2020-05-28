import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Administrator, AdminType} from 'src/app/model/classes/administrator';
import {User} from 'src/app/model/classes/users/user';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {ConnectedUserService} from 'src/app/model/services/connected-user.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  adminType: AdminType[] = [AdminType.manager, AdminType.viewer];
  administrators: Administrator[] = [];

  organizationUsers: User[] = [];
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly administratorService: AdministratorService,
    public readonly route: ActivatedRoute,
    private readonly connectedUserService: ConnectedUserService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      adminRole: [],
      adminEmail: [],
    });
  }

  /**
   * Add administrator email and role to the administrators array defined above
   */

  addAdmin(): void {
    const admin: Administrator = {
      id: this.checkIfEmailIsUser(
        this.formGroup.value.adminEmail,
        this.organizationUsers,
      ),
      email: this.formGroup.value.adminEmail,
      role: this.formGroup.value.adminRole as AdminType,
    };

    this.administratorService
      .addAdministrator(Number(this.route.snapshot.paramMap.get('id')), admin)
      .subscribe(
        () => {},
        (err: Error) => console.error(err),
      );
  }

  /**
   * Remove administrator 'admin' from administrator array defined above
   */
  deleteAdmin(administratorId: number): void {
    // get index in the administrators array of admin
    this.administratorService
      .removeAdministrator(
        Number(this.route.snapshot.paramMap.get('id')),
        administratorId,
      )
      .subscribe(
        () => {
          const admin = this.administrators.find(
            (element: Administrator) => element.id === administratorId,
          );
          this.administrators.splice(
            this.administrators.indexOf(admin as Administrator),
            1,
          );
        },
        (err: Error) => console.error(err),
      );
  }

  /**
   * Get administrators of a certain organization
   */
  getOrgAdministrators(organizationId: number): void {
    this.administratorService.getAdministrators(organizationId).subscribe(
      (response: Administrator[]) => {
        this.administrators = response;
      },
      (err: Error) => console.error(err),
    );
  }

  /**
   * Get users connected to a certain organization
   */
  getOrgUsers(organizationId: number): void {
    this.connectedUserService.getUserConnectedToOrg(organizationId).subscribe(
      (response: User[]) => (this.organizationUsers = response),
      (err: Error) => console.error(err),
    );
  }

  /**
   * Check if the given email is registered in Stalker anc if it's connected with this organization
   */
  checkIfEmailIsUser(email: string, userList: User[]): number {
    let found = -1;
    userList.forEach((element) => {
      if (element.data?.email === email) {
        found = element.id as number;
      }
    });
    return found;
  }
}
