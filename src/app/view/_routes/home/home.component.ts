import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as sha512 from 'js-sha512';
import {LoginDataBuilder} from 'src/app/model/classes/users/login-data';

import {LoginService} from '../../../model/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  toggle = true;

  public nestedForm: FormGroup = new FormGroup({
    emailForm: new FormControl(''),
    passwordForm: new FormControl(''),
  });

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Stalker');
  }

  public login(email: string, password: string): void {
    if (!this.validateInput(email, password)) {
      return;
    }

    const loginDataBuilder = new LoginDataBuilder(email, sha512.sha512(password));
    this.loginService.login(loginDataBuilder.build()).subscribe(
      () => {
        this.router.navigate([`/users/${this.loginService.getUserId()}`]);
      },
      (err: Error) => console.error(err),
    );
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

  public translate(i: number): void {
    if (i) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }
  }

  public userLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
