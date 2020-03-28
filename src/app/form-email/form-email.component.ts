/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import {Component, OnInit, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  Validators,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-email',
  templateUrl: 'form-email.component.html',
  styleUrls: ['form-email.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormEmailComponent),
      multi: true,
    },
  ],
})
export class FormEmailComponent implements OnInit, ControlValueAccessor {
  public emailForm: FormGroup = new FormGroup({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // constructor() {}

  ngOnInit(): void {}

  public onTouched: () => void = () => {};
  writeValue(val: any): void {
    val && this.emailForm.setValue(val, {emitEvent: false});
  }
  registerOnChange(fn: any): void {
    this.emailForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
