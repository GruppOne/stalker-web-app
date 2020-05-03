import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminType} from 'src/app/model/classes/administrator';
import {Organization} from 'src/app/model/classes/organization';
import {OrganizationService} from 'src/app/model/services/organization.service';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-organizations',
  styleUrls: ['organizations.component.scss'],
  templateUrl: 'organizations.component.html',
})
export class OrganizationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'role', 'private'];
  dataSource: MatTableDataSource<{organization: Organization; role: AdminType}>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort();

  organizationsRoles: {organization: Organization; role: AdminType}[] = [];

  constructor(private readonly organizationService: OrganizationService) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(Array.from(this.organizationsRoles));
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.getAdminOrganizations();
    if (this.organizationsRoles.length === 0) {
      this.organizationsRoles = [
        {organization: {id: 1, name: 'org1', isPrivate: true}, role: AdminType.admin},
        {organization: {id: 2, name: 'org2', isPrivate: true}, role: AdminType.viewer},
      ];
    }
    this.dataSource = new MatTableDataSource(Array.from(this.organizationsRoles));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAdminOrganizations(): void {
    this.organizationService.getAdminOrganizations().subscribe(
      (response: {organization: Organization; role: AdminType}[]) =>
        (this.organizationsRoles = response),

      (err: Error) => console.error(err.message),
    );
  }
}
