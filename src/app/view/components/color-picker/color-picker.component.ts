import {Component, HostListener, Input} from '@angular/core';
import {ColorEvent} from 'ngx-color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input() color!: string;
  randomColor = this.getRandomColor();
  shown = false;
  handleChangeComplete($event: ColorEvent): void {
    console.log($event.color.hex);
    this.randomColor = $event.color.hex;
  }

  constructor() {
    if (this.color) {
      this.randomColor = this.color;
    }
  }

  getRandomColor(): string {
    const hexadecimalDigits = '0123456789ABCD';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexadecimalDigits[Math.floor(Math.random() * 14)];
    }
    return color;
  }

  @HostListener('document:mousedown', ['$event'])
  hide(): void {
    this.shown = false;
  }

  showToggle(): void {
    this.shown = !this.shown;
  }
}
