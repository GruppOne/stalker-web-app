import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminType} from 'src/app/model/classes/administrator';
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
  displayedColumns: string[] = ['name', 'description', 'role', 'private'];
  dataSource: MatTableDataSource<{
    id: number;
    name: string;
    description: string;
    role: AdminType;
    private: string;
  }>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort();

  organizationsRoles: {
    id: number;
    name: string;
    description: string;
    role: AdminType;
    private: string;
  }[] = [];

  constructor(private readonly organizationService: OrganizationService) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(Array.from(this.organizationsRoles));
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAdminOrganizations();
    if (this.organizationsRoles.length === 0) {
      this.organizationsRoles = [
        {
          id: 1,
          name: 'unipd',
          description: 'lorem ipsum...',
          role: AdminType.admin,
          private: 'private',
        },
        {
          id: 2,
          name: 'GruppOne',
          description: 'sit amet...',
          role: AdminType.viewer,
          private: 'public',
        },
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
      (
        response: {
          id: number;
          name: string;
          description: string;
          role: AdminType;
          private: string;
        }[],
      ) => (this.organizationsRoles = response),

      (err: Error) => console.error(err.message),
    );
  }
}
