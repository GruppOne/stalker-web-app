import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormPasswordComponent} from './form-password.component';
// import {By} from '@angular/platform-browser';

describe('FormPasswordComponent', () => {
  let component: FormPasswordComponent;
  let fixture: ComponentFixture<FormPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormPasswordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a value in the input field', () => {
    component.writeValue({pwd: 'value'});
    expect(component.pwdForm.value.pwd).toEqual('value');
  });
  it('should register on touched', () => {
    component.registerOnTouched(true);
    expect(component.onTouched).toBeTrue();
  });
});
