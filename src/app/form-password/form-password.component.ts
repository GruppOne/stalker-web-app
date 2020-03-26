import {Component, OnInit, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  Validators,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-password',
  templateUrl: 'form-password.component.html',
  styleUrls: ['form-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPasswordComponent),
      multi: true,
    },
  ],
})
export class FormPasswordComponent implements OnInit, ControlValueAccessor {
  public pwdForm: FormGroup = new FormGroup({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    pwd: new FormControl('', [Validators.required]),
  });

  hide = true;

  constructor() {}

  ngOnInit(): void {}

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    // eslint-disable-next-line no-unused-expressions
    val && this.pwdForm.setValue(val, {emitEvent: false});
  }
  registerOnChange(fn: any): void {
    this.pwdForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
