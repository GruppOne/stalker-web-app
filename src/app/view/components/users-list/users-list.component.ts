import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/model/classes/users/user';
import {UserService} from 'src/app/model/services/user.service';

import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {InsertEmailDialogComponent} from '../insert-email-dialog/insert-email-dialog.component';
import {LoginService} from 'src/app/model/services/login.service';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-users-list',
  styleUrls: ['users-list.component.scss'],
  templateUrl: 'users-list.component.html',
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'disconnect'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort();

  connectedUsers: User[] = [];
  userLevel = 0;
  constructor(
    private readonly userService: UserService,
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    public readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly loginService: LoginService,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.route.snapshot.paramMap.get('id')) {
      const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
      this.getUserConnectedToOrg(organizationId);
    } else {
      this.getStalkerUsers();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserConnectedToOrg(id: number): void {
    this.userService.getUsersConnectedToOrg(id).subscribe(
      (response: User[]) => {
        this.connectedUsers = response;
        this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
      },
      (err: Error) => {
        this.snackBar.open(err.toString(), 'Ok');
        this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
      },
    );
  }
  getStalkerUsers(): void {
    this.userService.getStalkerUsers().subscribe(
      (response: User[]) => {
        this.connectedUsers = response;
        this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
      },
      (err: Error) => {
        this.snackBar.open(err.toString(), 'Ok');
        this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
      },
    );
  }
  deleteButtonAction(userId: number, email: string): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.disconnectUserById(userId);
    } else {
      this.deleteUserById(userId, email);
    }
  }

  deleteUserById(userId: number, email: string): void {
    let textMessage = "Do you really want to delete this user's account from Stalker?";
    textMessage += `<br>Please type <span>${email}</span> to confirm.`;
    const dialogRef = this.dialog.open(InsertEmailDialogComponent, {
      data: {
        message: textMessage,
        expectedEmail: email,
      },
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUserById(userId).subscribe(
          () => {
            this.removeUserFromList(userId);
          },
          (err: Error) => {
            this.snackBar.open(err.toString(), 'Ok');
          },
        );
      }
    });
  }
  disconnectUserById(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Do you really want to disconnect this user from your organization?',
      },
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService
          .disconnectUserById(+(this.route.snapshot.paramMap.get('id') as string), userId)
          .subscribe(
            () => {
              this.removeUserFromList(userId);
            },
            (err: Error) => {
              this.snackBar.open(err.toString(), 'Ok');
            },
          );
      }
    });
  }
  removeUserFromList(userId: number): void {
    const toDeleteUser = this.connectedUsers.find(
      (element: User) => element.id === userId,
    );
    this.connectedUsers.splice(this.connectedUsers.indexOf(toDeleteUser as User), 1);
    this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
  }

  getLink(userId: number): string {
    if (this.router.url === '/users') {
      return `/user/${userId}`;
    } else {
      return `/organization/${
        this.route.snapshot.paramMap.get('id') as string
      }/user/${userId}/history`;
    }
  }
  getLevel(): void {
    this.loginService
      .getUserRole(
        this.route.snapshot.paramMap.get('id')
          ? +(this.route.snapshot.paramMap.get('id') as string)
          : 0,
      )
      .subscribe((response: number) => (this.userLevel = response));
  }
}
