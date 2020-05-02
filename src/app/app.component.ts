import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './model/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  componentsTooltip = '';
  components = [
    'Fabio Scettro',
    'Alessandro Rizzo',
    'Riccardo Agatea',
    'Luca Ercole',
    'Riccardo Cestaro',
    'Alberto Cocco',
    'Alberto Gobbo',
    'Tobia Apolloni',
  ];

  constructor(public router: Router, private readonly loginService: LoginService) {}

  getRoute(): string {
    return this.router.url;
  }

  backHome(): void {
    if (this.getRoute() !== '/home') {
      this.router.navigate(['/home']);
    }
  }

  generateComponents(): void {
    // empty string
    this.componentsTooltip = '';

    // Fisher–Yates algorithm to random reorder components array
    for (let i = this.components.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.components[i], this.components[j]] = [this.components[j], this.components[i]];
    }

    // append all components to the string
    this.components.forEach((element) => {
      this.componentsTooltip += element + ', ';
    });

    // delete last comma
    this.componentsTooltip = this.componentsTooltip.slice(0, -2);
  }

  userLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}

// Fabio Scettro, Alessandro Rizzo, Riccardo Agatea, Luca Ercole, Riccardo Cestaro, Alberto Cocco, Alberto Gobbo, Tobia Apolloni
