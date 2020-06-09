import {Component, HostListener, Input, Inject} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input() color!: string;
  @Input() id!: number;
  shown = false;

  constructor(@Inject(MapComponent) private readonly parent: MapComponent) {}

  handleChangeComplete($event: ColorEvent): void {
    console.log($event.color.hex);
    this.color = $event.color.hex;
    this.parent.setColors(this.color, this.id);
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
