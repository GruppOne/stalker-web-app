import {Component, OnInit, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  Validators,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface MailType {
  email: string;
}
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
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {}

  public onTouched: () => void = () => {};
  writeValue(val: MailType): void {
    if (val) {
      this.emailForm.setValue(val, {emitEvent: false});
    }
  }
  registerOnChange(fn: () => void): void {
    this.emailForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
