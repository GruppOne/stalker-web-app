import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface InserEmailDialogData {
  message: string;
  email: string;
  expectedEmail: string;
}

@Component({
  selector: 'app-insert-email-dialog',
  templateUrl: './insert-email-dialog.component.html',
  styleUrls: ['./insert-email-dialog.component.scss'],
})
export class InsertEmailDialogComponent implements OnInit {
  valid = false;
  constructor(
    public dialogRef: MatDialogRef<InsertEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InserEmailDialogData,
  ) {}
  ngOnInit(): void {}

  checkEmail(): void {
    this.valid = this.data.email === this.data.expectedEmail;
  }
}
