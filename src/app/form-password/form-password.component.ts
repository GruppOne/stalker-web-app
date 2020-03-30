import {Component, OnInit, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  Validators,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface PwdType {
  mail: string;
}
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
    pwd: new FormControl('', [Validators.required]),
  });

  hide = true;

  // constructor() {}

  ngOnInit(): void {}

  public onTouched: () => void = () => {};

  writeValue(val: PwdType): void {
    if (val) {
      this.pwdForm.setValue(val, {emitEvent: false});
    }
  }
  registerOnChange(fn: () => void): void {
    this.pwdForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
