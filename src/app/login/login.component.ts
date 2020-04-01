import {ViewportScroller} from '@angular/common';
import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {User, UserBuilder} from '../models/user';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public nestedForm: FormGroup = new FormGroup({
    emailForm: new FormControl(''),
    passwordForm: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private titleService: Title,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login - Stalker');
  }

  // funzione per scrollare sugli elementi tramite una anchor
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  public login(email: string, password: string): void {
    if (!this.validateInput(email, password)) {
      return;
    }
    const userBuilder = new UserBuilder(email, password);
    this.loginService
      .login(userBuilder.build())
      .subscribe((response: HttpResponse<User>) => {
        if (response && response.status === 200) {
          this.router.navigate(['/home']);
        } else {
          console.log('something went wrong, try again');
        }
      });
  }
  public validateInput(email: string, password: string): boolean {
    const regexMail = new RegExp(
      '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9])+$',
    );
    const regexPwd = new RegExp(
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    );
    if (!regexMail.test(email) || !regexPwd.test(password)) {
      return false;
    } else {
      return true;
    }
  }
}
