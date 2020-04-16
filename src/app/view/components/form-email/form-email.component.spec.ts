import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormEmailComponent} from './form-email.component';

describe('FormEmailComponent', () => {
  let component: FormEmailComponent;
  let fixture: ComponentFixture<FormEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormEmailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a value in the input field', () => {
    component.writeValue({email: 'value'});
    expect(component.emailForm.value.email).toEqual('value');
  });
  it('should register on touched', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouched).toBeDefined();
  });
});
