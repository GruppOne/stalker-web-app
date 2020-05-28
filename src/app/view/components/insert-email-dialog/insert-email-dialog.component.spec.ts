import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InsertEmailDialogComponent} from './insert-email-dialog.component';

describe('InsertEmailDialogComponent', () => {
  let component: InsertEmailDialogComponent;
  let fixture: ComponentFixture<InsertEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsertEmailDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
