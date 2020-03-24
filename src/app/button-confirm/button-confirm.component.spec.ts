import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfirmComponent } from './button-confirm.component';

describe('ButtonConfirmComponent', () => {
  let component: ButtonConfirmComponent;
  let fixture: ComponentFixture<ButtonConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
