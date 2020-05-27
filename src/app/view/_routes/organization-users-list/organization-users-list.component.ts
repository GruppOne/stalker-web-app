import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-organization-users-list',
  styleUrls: ['organization-users-list.component.scss'],
  templateUrl: 'organization-users-list.component.html',
})
export class OrganizationUsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email'];
  dataSource: MatTableDataSource<{
    id: number;
    name: string;
    email: string;
  }>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort();

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
