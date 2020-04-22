import {ViewportScroller} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,
    private readonly viewportScroller: ViewportScroller,
  ) {}
  getRoute(): string {
    return this.router.url;
  }

  // funzione per scrollare sugli elementi tramite una anchor
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  backHome(): void {
    if (this.getRoute() !== '/home') {
      this.router.navigate(['/home']);
    }
  }
}
