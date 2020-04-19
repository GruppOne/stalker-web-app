import {ViewportScroller} from '@angular/common';
import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as sha512 from 'js-sha512';

import {User, UserBuilder} from '../../../model/classes/users/user';
import {LoginService} from '../../../model/services/login.service';

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
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly viewportScroller: ViewportScroller,
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
    const hashedPass = sha512.sha512(password);
    const userBuilder = new UserBuilder(email, sha512.sha512(password));
    console.log(hashedPass);
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
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$',
    );

    return regexMail.test(email) && regexPwd.test(password);
  }
}