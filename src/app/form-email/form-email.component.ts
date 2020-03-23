import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-email',
  templateUrl: 'form-email.component.html',
  styleUrls: ['form-email.component.scss'],
})
export class FormEmailComponent implements OnInit {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/unbound-method
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {}
}
