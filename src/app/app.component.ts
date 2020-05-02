import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './model/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, readonly loginService: LoginService) {}
  getRoute(): string {
    return this.router.url;
  }

  backHome(): void {
    if (this.getRoute() !== '/home') {
      this.router.navigate(['/home']);
    }
  }
}
