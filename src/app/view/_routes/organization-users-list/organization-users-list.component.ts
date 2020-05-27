import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {User} from 'src/app/model/classes/users/user';
import {UserService} from 'src/app/model/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-organization-users-list',
  styleUrls: ['organization-users-list.component.scss'],
  templateUrl: 'organization-users-list.component.html',
})
export class OrganizationUsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'email', 'disconnect'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort();

  connectedUsers: User[] = [
    {
      id: 1,
      userData: {
        email: 'alex.rizzo1998@gmail.com',
        firstName: 'Alessandro',
        lastName: 'Rizzo',
      },
    },
    {
      id: 2,
      userData: {
        email: 'alex.rizzo1998@gmail.com',
        firstName: 'Fabio',
        lastName: 'Scettro',
      },
    },
  ];
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUserConnectedToOrg(organizationId);
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
        console.log(err);
        this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
      },
    );
  }
  disconnectUserById(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        message: 'Do you really want to disconnect this user from your organization?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.userService
          .disconnectUserById(+(this.route.snapshot.paramMap.get('id') as string), userId)
          .subscribe(
            () => {
              const toDeleteUser = this.connectedUsers.find(
                (element: User) => element.id === userId,
              );
              this.connectedUsers.splice(
                this.connectedUsers.indexOf(toDeleteUser as User),
                1,
              );
              this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
            },
            (err: Error) => {
              console.log(err);
              const toDeleteUser = this.connectedUsers.find(
                (element: User) => element.id === userId,
              );
              this.connectedUsers.splice(
                this.connectedUsers.indexOf(toDeleteUser as User),
                1,
              );
              this.dataSource = new MatTableDataSource(Array.from(this.connectedUsers));
            },
          );
      }
    });
  }
}
