import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Administrator, AdminType} from 'src/app/model/classes/administrator';
import {User} from 'src/app/model/classes/users/user';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {UserService} from 'src/app/model/services/user.service';

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
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.formGroup = this.formBuilder.group({
      adminRole: [],
      adminEmail: [],
    });
    this.getOrgAdministrators(organizationId);
    this.getOrgUsers(organizationId);
  }

  /**
   * Add administrator email and role to the administrators array defined above
   */

  addAdmin(): void {
    const admin: Administrator = {
      userId: this.checkIfEmailIsUser(
        this.formGroup.value.adminEmail,
        this.organizationUsers,
      ),
      email: this.formGroup.value.adminEmail,
      role: this.formGroup.value.adminRole as AdminType,
    };

    this.administratorService
      .addAdministrator(Number(this.route.snapshot.paramMap.get('id')), admin)
      .subscribe(
        () => {
          this.getOrgAdministrators(Number(this.route.snapshot.paramMap.get('id')));
        },
        (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
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
            (element: Administrator) => element.userId === administratorId,
          );
          this.administrators.splice(
            this.administrators.indexOf(admin as Administrator),
            1,
          );
        },
        (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
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
      (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
    );
  }

  /**
   * Get users connected to a certain organization
   */
  getOrgUsers(organizationId: number): void {
    this.userService.getUsersConnectedToOrg(organizationId).subscribe(
      (response: User[]) => (this.organizationUsers = response),
      (err: Error) => console.error(err),
    );
  }

  /**
   * Check if the given email is registered in Stalker anc if it's connected with this organization
   */
  checkIfEmailIsUser(email: string, userList: User[]): number {
    console.log(userList);
    console.log(email);
    let found = -1;
    userList.forEach((element) => {
      if (element.data?.email === email) {
        found = element.id as number;
      }
    });
    return found;
  }
}
