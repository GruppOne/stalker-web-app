import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ColorPickerComponent} from './color-picker.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MapComponent} from '../map/map.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: MapComponent}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
