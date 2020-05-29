import {Component, HostListener} from '@angular/core';
import {ColorEvent} from 'ngx-color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  randomColor = this.getRandomColor();
  shown = false;
  handleChangeComplete($event: ColorEvent): void {
    console.log($event.color.hex);
    this.randomColor = $event.color.hex;
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
