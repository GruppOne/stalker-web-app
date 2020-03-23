import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
})
export class FormPasswordComponent implements OnInit {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/unbound-method
  pwdFormControl = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {}
}
